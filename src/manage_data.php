<?php
require_once __DIR__ . '/database/database.php';
$db = new connect();
$mysqli = $db->getMysqli();

// Allowed entities and metadata: table => [pk, columns => [col => label]]
$entities = [
  'TaiKhoan' => ['pk'=>'maTaiKhoan','cols'=>['tenNguoiDung'=>'Full name','tenDangNhap'=>'Username','matKhau'=>'Password','email'=>'Email','vaiTro'=>'Role']],
  'KhachHang' => ['pk'=>'maKhachHang','cols'=>['tenKhachHang'=>'Name','soDienThoaiKhachHang'=>'Phone','gioiTinh'=>'Gender','ghiChu'=>'Note']],
  'NhanVien' => ['pk'=>'maNhanVien','cols'=>['tenNhanVien'=>'Name','ngayVaoLam'=>'Start Date','ngayKetThuc'=>'End Date','soDienThoai'=>'Phone','tienLuong'=>'Salary','ChucVu'=>'Position']],
  'MonAn' => ['pk'=>'maMonAn','cols'=>['tenMonAn'=>'Name','anhMonAn'=>'Image','giaMonAn'=>'Price','kichThuoc'=>'Size','ghiChu'=>'Note','xuatXu'=>'Origin','trangThai'=>'Status']],
  'NuocUong' => ['pk'=>'maNuoc','cols'=>['TenNuoc'=>'Name','giaTien'=>'Price','kichThuoc'=>'Size','trangThai'=>'Status']],
  'Banner' => ['pk'=>'maBanner','cols'=>['tenBanner'=>'Title','gioiThieu'=>'Intro','ngayTao'=>'Date']],
  'KhuVuc' => ['pk'=>'maKhuVuc','cols'=>['tenKhuVuc'=>'Area name']],
  'Ban' => ['pk'=>'maBan','cols'=>['maKhuVuc'=>'AreaId','ngayDatBan'=>'BookedAt','soNguoi'=>'Seats','Vitri'=>'Position','trangThai'=>'Status']],
  'KhuyenMai' => ['pk'=>'MaVoucher','cols'=>['giaTri'=>'Value','tenKhuyenMai'=>'Name','NgayBatDau'=>'StartDate','NgayHetHan'=>'EndDate']],
];

$table = $_GET['table'] ?? array_key_first($entities);
if (!array_key_exists($table, $entities)) $table = array_key_first($entities);

$messages = [];

// Handle actions: add, delete
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';
  $target = $_POST['table'] ?? '';
  if (!array_key_exists($target, $entities)) {
    $messages[] = 'Invalid table.';
  } else {
    $meta = $entities[$target];
    $pk = $meta['pk'];

    if ($action === 'add') {
      // Build insert dynamically
      $cols = [];
      $placeholders = [];
      $types = '';
      $values = [];
      foreach ($meta['cols'] as $col => $label) {
        if (isset($_POST[$col]) && $_POST[$col] !== '') {
          $cols[] = $col;
          $placeholders[] = '?';
          $val = $_POST[$col];
          // password hashing for matKhau
          if ($col === 'matKhau') $val = password_hash($val, PASSWORD_DEFAULT);
          $values[] = $val;
          // simple type inference
          if (is_numeric($val)) $types .= 'd'; else $types .= 's';
        }
      }
      if (!empty($cols)) {
        $sql = "INSERT INTO {$target} (" . implode(',', $cols) . ") VALUES (" . implode(',', $placeholders) . ")";
        $stmt = $mysqli->prepare($sql);
        if ($stmt) {
          // bind dynamically
          $bind_names = [];
          $bind_names[] = $types;
          for ($i=0;$i<count($values);$i++) $bind_names[] = &$values[$i];
          call_user_func_array([$stmt, 'bind_param'], $bind_names);
          if ($stmt->execute()) $messages[] = ucfirst($target) . ' added.'; else $messages[] = 'Insert failed: ' . $stmt->error;
          $stmt->close();
        } else {
          $messages[] = 'Prepare failed: ' . $mysqli->error;
        }
      } else $messages[] = 'No fields provided.';
    }

    if ($action === 'delete') {
      $id = $_POST['id'] ?? '';
      $sql = "DELETE FROM {$target} WHERE {$pk} = ?";
      $stmt = $mysqli->prepare($sql);
      if ($stmt) {
        $stmt->bind_param('i', $id);
        if ($stmt->execute()) $messages[] = ucfirst($target) . ' deleted.'; else $messages[] = 'Delete failed: ' . $stmt->error;
        $stmt->close();
      } else $messages[] = 'Prepare failed: ' . $mysqli->error;
    }
  }
}

// Fetch current list for selected table
$rows = [];
$meta = $entities[$table];
$pk = $meta['pk'];
try {
  $res = $db->select("SELECT * FROM {$table} ORDER BY {$pk} DESC LIMIT 200");
  if ($res) while ($r = $res->fetch_assoc()) $rows[] = $r;
} catch (Exception $e) {}

function esc($s){ return htmlspecialchars((string)$s); }

?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Manage Data — Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{background:#f4f7fb;color:#212529}
    .card{border-radius:12px;box-shadow:0 6px 18px rgba(20,40,80,0.06)}
    .tbl th{white-space:nowrap}
    .entity-nav .nav-link{cursor:pointer}
  </style>
</head>
<body class="py-4">
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h4">Manage Data (Add / Delete)</h1>
      <div>
        <a href="componemt/dashboard/dashboard.php" class="btn btn-outline-secondary btn-sm">Back to Dashboard</a>
      </div>
    </div>

    <?php if (!empty($messages)): ?>
      <div class="mb-3">
        <?php foreach ($messages as $m): ?>
          <div class="alert alert-info py-2 mb-2"><?php echo esc($m); ?></div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <div class="row">
      <div class="col-lg-3 mb-3">
        <div class="card p-3">
          <h6 class="mb-2">Entities</h6>
          <div class="nav flex-column entity-nav">
            <?php foreach ($entities as $key => $m): ?>
              <a class="nav-link <?php echo $key=== $table? 'active':'';?>" href="?table=<?php echo urlencode($key);?>"><?php echo esc($key);?></a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="card p-3 mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0"><?php echo esc($table); ?> <small class="text-muted">(Add / Delete)</small></h5>
            <div>
              <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add <?php echo esc($table);?></button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover tbl mb-0">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <?php foreach (array_keys($meta['cols']) as $c): ?><th><?php echo esc($c);?></th><?php endforeach; ?>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php if (empty($rows)): ?>
                  <tr><td colspan="<?php echo count($meta['cols'])+2;?>" class="text-center text-muted">No records</td></tr>
                <?php else: foreach ($rows as $r): ?>
                  <tr>
                    <td><?php echo esc($r[$pk]);?></td>
                    <?php foreach (array_keys($meta['cols']) as $c): ?>
                      <td><?php echo esc($r[$c] ?? ''); ?></td>
                    <?php endforeach; ?>
                    <td>
                      <form method="post" class="d-inline" onsubmit="return confirm('Delete this record?');">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="table" value="<?php echo esc($table);?>">
                        <input type="hidden" name="id" value="<?php echo esc($r[$pk]);?>">
                        <button class="btn btn-sm btn-danger">Delete</button>
                      </form>
                    </td>
                  </tr>
                <?php endforeach; endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form method="post">
            <div class="modal-header"><h5 class="modal-title">Add <?php echo esc($table);?></h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
              <input type="hidden" name="action" value="add">
              <input type="hidden" name="table" value="<?php echo esc($table);?>">
              <?php foreach ($meta['cols'] as $col => $label): ?>
                <div class="mb-2">
                  <label class="form-label"><?php echo esc($label);?></label>
                  <?php if ($col === 'matKhau'): ?>
                    <input name="<?php echo esc($col);?>" type="password" class="form-control" required>
                  <?php elseif (stripos($col,'ngay') !== false || stripos($col,'Ngay') !== false): ?>
                    <input name="<?php echo esc($col);?>" type="date" class="form-control">
                  <?php elseif (stripos($col,'gia') !== false || stripos($col,'tien') !== false || stripos($col,'Price') !== false || stripos($col,'giaTien')!==false): ?>
                    <input name="<?php echo esc($col);?>" type="number" step="0.01" class="form-control">
                  <?php else: ?>
                    <input name="<?php echo esc($col);?>" class="form-control">
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            </div>
            <div class="modal-footer"><button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary">Add</button></div>
          </form>
        </div>
      </div>
    </div>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
