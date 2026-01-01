    <?php
    // admin_dashboard.php
    // Full rewritten admin dashboard with secure CRUD and image upload
    // IMPORTANT: Update DB connection below with your credentials
    session_start();
    $dbHost = '127.0.0.1';
    $dbName = 'nhahang';
    $dbUser = 'root';
    $dbPass = '';
    $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
    // -------------------------------------------

    try {
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (Exception $e) {
        die('Database connection error: ' . $e->getMessage());
    }

    // Basic CSRF token
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(24));
    }

    $table = $_GET['table'] ?? 'nhanvien';
   $allowedTables = ['nhanvien', 'khachhang', 'monan', 'ban', 'taikhoan', 'sanphamall'];
    if (!in_array($table, $allowedTables)) $table = 'nhanvien';

    $action = $_POST['action'] ?? '';

    function uploadImage($fileField)
    {
        if (empty($_FILES[$fileField]) || $_FILES[$fileField]['error'] !== UPLOAD_ERR_OK) {
            return '';
        }

        $file = $_FILES[$fileField];
        $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file['type'], $allowed)) return '';

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $name = time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
        $dir = __DIR__ . '/uploads/';
        if (!is_dir($dir)) mkdir($dir, 0777, true);

        $path = $dir . $name;
        if (move_uploaded_file($file['tmp_name'], $path)) {
            return $name;
        }
        return '';
    }
   function mapTable($table)
{
    $map = [
        'nhanvien'   => ['db' => 'NhanVien',   'id' => 'maNhanVien'],
        'khachhang' => ['db' => 'KhachHang',  'id' => 'maKhachHang'],
        'monan'     => ['db' => 'sanpham',    'id' => 'maMonAn'],
        'ban'       => ['db' => 'Ban',        'id' => 'maBan'],
        'taikhoan'  => ['db' => 'TaiKhoan',   'id' => 'maTaiKhoan'],
        'sanphamall'=> ['db' => 'sanphamall','id' => 'masp'],   // ✅ THÊM
    ];
    return $map[$table];
}

 $fieldsMap = [
    'nhanvien' => [
        'tenNhanVien' => 'Tên Nhân Viên',
        'ngayVaoLam'  => 'Ngày Vào Làm',
        'soDienThoai' => 'Số Điện Thoại',
        'tienLuong'   => 'Tiền Lương',
        'ChucVu'      => 'Chức Vụ'
    ],
    'khachhang' => [
        'tenKhachHang' => 'Tên Khách Hàng',
        'soDienThoai'  => 'Số Điện Thoại',
        'email'        => 'Email',
        'diaChi'       => 'Địa Chỉ'
    ],
    'monan' => [
        'tenMonAn'  => 'Tên Món Ăn',
        'gioiThieu' => 'Giới Thiệu',
        'anhMonAn'  => 'Ảnh',
        'giaMonAn'  => 'Giá',
        'giaGiam'   => 'Giảm Giá'
    ],
    'ban' => [
        'ngayDatBan' => 'Ngày Đặt',
        'soNguoi'    => 'Số Người',
        'viTri'      => 'Vị Trí',
        'trangThai'  => 'Trạng Thái'
    ],
    'taikhoan' => [
        'tenNguoiDung' => 'Tên Người Dùng',
        'tenDangNhap'  => 'Tên Đăng Nhập',
        'matKhau'      => 'Mật Khẩu',
        'email'        => 'Email'
    ],
    'sanphamall' => [                   // ✅ THÊM
        'tensp'         => 'Tên Sản Phẩm',
        'giasp'         => 'Giá',
        'anhsp'         => 'Ảnh',
        'giakhuyenmai' => 'Giá Khuyến Mãi',
        'soluong'       => 'Số Lượng',
        'loaisp'        => 'Loại Sản Phẩm'
    ]
];




    $map = mapTable($table);
    $dbTable = $map['db'];
    $idField = $map['id'];

    // Process POST actions (add, update, delete)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // CSRF check
        if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
            die('Invalid CSRF token');
        }

        if ($action === 'add') {
            if ($table === 'monan') {
                $tenMonAn = $_POST['tenMonAn'] ?? '';
                $gioiThieu = $_POST['gioiThieu'] ?? '';
                $giaMonAn = $_POST['giaMonAn'] ?? 0;
                $giaGiam = $_POST['giaGiam'] ?? 0;

                $fileName = uploadImage('anhMonAn');

                $stmt = $pdo->prepare("INSERT INTO {$dbTable} (tenMonAn, gioiThieu, anhMonAn, giaMonAn, giaGiam) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$tenMonAn, $gioiThieu, $fileName, $giaMonAn, $giaGiam]);
                $_SESSION['flash'] = 'Thêm món ăn thành công.';
            } elseif ($table === 'nhanvien') {
                $ten = $_POST['tenNhanVien'] ?? '';
                $ngay = $_POST['ngayVaoLam'] ?? null;
                $phone = $_POST['soDienThoai'] ?? '';
                $luong = $_POST['tienLuong'] ?? 0;
                $chucvu = $_POST['ChucVu'] ?? '';
                $stmt = $pdo->prepare("INSERT INTO {$dbTable} (tenNhanVien, ngayVaoLam, soDienThoai, tienLuong, ChucVu) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$ten, $ngay, $phone, $luong, $chucvu]);
                $_SESSION['flash'] = 'Thêm nhân viên thành công.';
            } elseif ($table === 'khachhang') {
                $ten = $_POST['tenKhachHang'] ?? '';
                $phone = $_POST['soDienThoai'] ?? '';
                $email = $_POST['email'] ?? '';
                $diachi = $_POST['diaChi'] ?? '';
                $stmt = $pdo->prepare("INSERT INTO {$dbTable} (tenKhachHang, soDienThoai, email, diaChi) VALUES (?, ?, ?, ?)");
                $stmt->execute([$ten, $phone, $email, $diachi]);
                $_SESSION['flash'] = 'Thêm khách hàng thành công.';
            } elseif ($table === 'ban') {
                $ngayDatBan = !empty($_POST['ngayDatBan']) ? $_POST['ngayDatBan'] : date('Y-m-d');
                $soNguoi = (int)($_POST['soNguoi'] ?? 0);
                $viTri = trim($_POST['viTri'] ?? '');
                $trangThai = $_POST['trangThai'] ?? 'Trống';

                if ($soNguoi < 1) {
                    $_SESSION['error'] = 'Số người phải lớn hơn 0.';
                    header('Location: ?table=' . $table);
                    exit;
                }
                if (empty($viTri)) {
                    $_SESSION['error'] = 'Vị trí không được để trống.';
                    header('Location: ?table=' . $table);
                    exit;
                }

                $stmt = $pdo->prepare("INSERT INTO {$dbTable} (ngayDatBan, soNguoi, viTri, trangThai) VALUES (?, ?, ?, ?)");
                $stmt->execute([$ngayDatBan, $soNguoi, $viTri, $trangThai]);
                $_SESSION['flash'] = 'Thêm bàn thành công.';
            } elseif ($table === 'taikhoan') {
                $tenND = $_POST['tenNguoiDung'] ?? '';
                $tenDN = $_POST['tenDangNhap'] ?? '';
                $matKhau = $_POST['matKhau'] ?? '';
                $email = $_POST['email'] ?? '';
                $hash = password_hash($matKhau, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO {$dbTable} (tenNguoiDung, tenDangNhap, matKhau, email) VALUES (?, ?, ?, ?)");
                $stmt->execute([$tenND, $tenDN, $hash, $email]);
                $_SESSION['flash'] = 'Thêm tài khoản thành công.';
            }
            elseif ($table === 'sanphamall') {
            // XỬ LÝ THÊM SANPHAMALL
            $tensp = $_POST['tensp'] ?? '';
            $giasp = $_POST['giasp'] ?? 0;
            $giakhuyenmai = $_POST['giakhuyenmai'] ?? 0;
            $soluong = $_POST['soluong'] ?? 0;
            $loaisp = $_POST['loaisp'] ?? '';
            $fileName = uploadImage('anhsp');
            $stmt = $pdo->prepare("INSERT INTO {$dbTable} (tensp, giasp, anhsp, giakhuyenmai, soluong, loaisp) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$tensp, $giasp, $fileName, $giakhuyenmai, $soluong, $loaisp]);
            $_SESSION['flash'] = 'Thêm sản phẩm thành công.';
        }

            header('Location: ?table=' . $table);
            exit;
        }

        if ($action === 'update') {
            $id = $_POST['id'] ?? '';
            if (!$id) die('Missing id');

            if ($table === 'monan') {
                $tenMonAn = $_POST['tenMonAn'] ?? '';
                $gioiThieu = $_POST['gioiThieu'] ?? '';
                $giaMonAn = $_POST['giaMonAn'] ?? 0;
                $giaGiam = $_POST['giaGiam'] ?? 0;

                $fileName = uploadImage('anhMonAn');

                if ($fileName !== '') {
                    $old = $pdo->prepare("SELECT anhMonAn FROM {$dbTable} WHERE {$idField} = ?");
                    $old->execute([$id]);
                    $rowOld = $old->fetch();
                    if ($rowOld && !empty($rowOld['anhMonAn'])) {
                        $oldPath = __DIR__ . '/uploads/' . $rowOld['anhMonAn'];
                        if (is_file($oldPath)) @unlink($oldPath);
                    }

                    $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenMonAn = ?, gioiThieu = ?, anhMonAn = ?, giaMonAn = ?, giaGiam = ? WHERE {$idField} = ?");
                    $stmt->execute([$tenMonAn, $gioiThieu, $fileName, $giaMonAn, $giaGiam, $id]);
                } else {
                    $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenMonAn = ?, gioiThieu = ?, giaMonAn = ?, giaGiam = ? WHERE {$idField} = ?");
                    $stmt->execute([$tenMonAn, $gioiThieu, $giaMonAn, $giaGiam, $id]);
                }

                $_SESSION['flash'] = 'Cập nhật món ăn thành công.';
            } elseif ($table === 'nhanvien') {
                $ten = $_POST['tenNhanVien'] ?? '';
                $ngay = $_POST['ngayVaoLam'] ?? null;
                $phone = $_POST['soDienThoai'] ?? '';
                $luong = $_POST['tienLuong'] ?? 0;
                $chucvu = $_POST['ChucVu'] ?? '';
                $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenNhanVien=?, ngayVaoLam=?, soDienThoai=?, tienLuong=?, ChucVu=? WHERE {$idField}=?");
                $stmt->execute([$ten, $ngay, $phone, $luong, $chucvu, $id]);
                $_SESSION['flash'] = 'Cập nhật nhân viên thành công.';
            } elseif ($table === 'khachhang') {
                $ten = $_POST['tenKhachHang'] ?? '';
                $phone = $_POST['soDienThoai'] ?? '';
                $email = $_POST['email'] ?? '';
                $diachi = $_POST['diaChi'] ?? '';
                $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenKhachHang=?, soDienThoai=?, email=?, diaChi=? WHERE {$idField}=?");
                $stmt->execute([$ten, $phone, $email, $diachi, $id]);
                $_SESSION['flash'] = 'Cập nhật khách hàng thành công.';
            } elseif ($table === 'ban') {
                $ngayDatBan = !empty($_POST['ngayDatBan']) ? $_POST['ngayDatBan'] : date('Y-m-d');
                $soNguoi = (int)($_POST['soNguoi'] ?? 0);
                $viTri = trim($_POST['viTri'] ?? '');
                $trangThai = $_POST['trangThai'] ?? 'Trống';

                if ($soNguoi < 1) {
                    $_SESSION['error'] = 'Số người phải lớn hơn 0.';
                    header('Location: ?table=' . $table);
                    exit;
                }
                if (empty($viTri)) {
                    $_SESSION['error'] = 'Vị trí không được để trống.';
                    header('Location: ?table=' . $table);
                    exit;
                }

                $stmt = $pdo->prepare("UPDATE {$dbTable} SET ngayDatBan=?, soNguoi=?, viTri=?, trangThai=? WHERE {$idField}=?");
                $stmt->execute([$ngayDatBan, $soNguoi, $viTri, $trangThai, $id]);
                $_SESSION['flash'] = 'Cập nhật bàn thành công.';
            } elseif ($table === 'taikhoan') {
                $tenND = $_POST['tenNguoiDung'] ?? '';
                $tenDN = $_POST['tenDangNhap'] ?? '';
                $matKhau = $_POST['matKhau'] ?? '';
                $email = $_POST['email'] ?? '';
                if (!empty($matKhau)) {
                    $hash = password_hash($matKhau, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenNguoiDung=?, tenDangNhap=?, matKhau=?, email=? WHERE {$idField}=?");
                    $stmt->execute([$tenND, $tenDN, $hash, $email, $id]);
                } else {
                    $stmt = $pdo->prepare("UPDATE {$dbTable} SET tenNguoiDung=?, tenDangNhap=?, email=? WHERE {$idField}=?");
                    $stmt->execute([$tenND, $tenDN, $email, $id]);
                }
                $_SESSION['flash'] = 'Cập nhật tài khoản thành công.';
            }
            elseif ($table === 'sanphamall') {
            // XỬ LÝ CẬP NHẬT SANPHAMALL
            $tensp = $_POST['tensp'] ?? '';
            $giasp = $_POST['giasp'] ?? 0;
            $giakhuyenmai = $_POST['giakhuyenmai'] ?? 0;
            $soluong = $_POST['soluong'] ?? 0;
            $loaisp = $_POST['loaisp'] ?? '';

            $fileName = uploadImage('anhsp');

            if ($fileName !== '') {
                // xóa ảnh cũ nếu có
                $old = $pdo->prepare("SELECT anhsp FROM {$dbTable} WHERE {$idField} = ?");
                $old->execute([$id]);
                $rowOld = $old->fetch();
                if ($rowOld && !empty($rowOld['anhsp'])) {
                    $oldPath = __DIR__ . '/uploads/' . $rowOld['anhsp'];
                    if (is_file($oldPath)) @unlink($oldPath);
                }

                $stmt = $pdo->prepare("UPDATE {$dbTable} SET tensp=?, giasp=?, anhsp=?, giakhuyenmai=?, soluong=?, loaisp=? WHERE {$idField}=?");
                $stmt->execute([$tensp, $giasp, $fileName, $giakhuyenmai, $soluong, $loaisp, $id]);
            } else {
                $stmt = $pdo->prepare("UPDATE {$dbTable} SET tensp=?, giasp=?, giakhuyenmai=?, soluong=?, loaisp=? WHERE {$idField}=?");
                $stmt->execute([$tensp, $giasp, $giakhuyenmai, $soluong, $loaisp, $id]);
            }

            $_SESSION['flash'] = 'Cập nhật sản phẩm thành công.';
        }

            header('Location: ?table=' . $table);
            exit;
        }

        if ($action === 'delete') {
            $id = $_POST['id'] ?? '';
            if (!$id) die('Missing id');

            if ($table === 'monan') {
                $old = $pdo->prepare("SELECT anhMonAn FROM {$dbTable} WHERE {$idField} = ?");
                $old->execute([$id]);
                $rowOld = $old->fetch();
                if ($rowOld && !empty($rowOld['anhMonAn'])) {
                    $oldPath = __DIR__ . '/uploads/' . $rowOld['anhMonAn'];
                    if (is_file($oldPath)) @unlink($oldPath);
                }
            }

            $stmt = $pdo->prepare("DELETE FROM {$dbTable} WHERE {$idField} = ?");
            $stmt->execute([$id]);
            $_SESSION['flash'] = 'Xóa bản ghi thành công.';

            header('Location: ?table=' . $table);
            exit;
        }
        
    }

    $stmt = $pdo->query("SELECT * FROM {$dbTable} ORDER BY {$idField} DESC");
    $currentData = $stmt->fetchAll();


    ?>

    <!DOCTYPE html>
    <html lang="vi">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
        <style>
        body {
            font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa
        }

        .header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            padding: 1rem 2rem
        }

        .container-main {
            display: flex
        }

        .sidebar {
            width: 30%;
            background: #fff;
            padding: 2rem 0;
            border-right: 1px solid #e0e0e0
        }

        .content {
            width: 70%;
            padding: 2rem
        }

        .menu-item {
            padding: 0.75rem 2rem;
            cursor: pointer;
            transition: 0.3s
        }

        .menu-item:hover {
            background: #f0f0f0
        }

        .menu-item.active {
            background: #667eea;
            color: #fff
        }
        </style>
    </head>

    <body>
        <div class="header d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-3">
                <div class="logo"><i class="bi bi-speedometer2"></i> <strong>ADMIN DASHBOARD</strong></div>
                <div class="search-box"><input id="searchInput" class="form-control" placeholder="Tìm kiếm..."></div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <i class="bi bi-bell" style="font-size:1.2rem"></i>
                <div class="admin-profile d-flex align-items-center gap-2"><img src="https://via.placeholder.com/32"
                        style="border-radius:50%"> Admin</div>
            </div>
        </div>

        <div class="container-main">
            <div class="sidebar">
                <div style="padding:0.75rem 2rem;font-weight:bold">Menu</div>
                <?php foreach ($allowedTables as $tb): ?>
                <div class="menu-item <?= $table === $tb ? 'active' : '' ?>"
                    onclick="location.href='?table=<?= $tb ?>'">
                    <?php echo ucfirst($tb); ?>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="content">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h2><?= ucfirst($table) ?></h2>
                    <div>
                        <?php if (!empty($_SESSION['flash'])): ?>
                        <div class="alert alert-success"><?= $_SESSION['flash']; unset($_SESSION['flash']); ?></div>
                        <?php endif; ?>
                        <?php if (!empty($_SESSION['error'])): ?>
                        <div class="alert alert-danger"><?= $_SESSION['error']; unset($_SESSION['error']); ?></div>
                        <?php endif; ?>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Thêm
                            Mới</button>
                    </div>
                </div>

                <div class="table-responsive bg-white rounded shadow-sm">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <?php if (!empty($currentData)): ?>
                                <?php foreach (array_keys($currentData[0]) as $col): ?>
                                <th><?= htmlspecialchars($col) ?></th>
                                <?php endforeach; ?>
                                <th>Thao Tác</th>
                                <?php endif; ?>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($currentData as $row): ?>
                            <tr>
                                <?php foreach ($row as $val): ?>
                                <td>
                                    <?php
                                    if (isset($val) && is_string($val) && strpos($val, '.') !== false && in_array(pathinfo($val, PATHINFO_EXTENSION), ['jpg','jpeg','png','gif','webp'])) {
                                        echo '<img src="uploads/' . htmlspecialchars($val) . '" alt="img" style="width:80px">';
                                    } else {
                                        echo htmlspecialchars((string)$val);
                                    }
                                    ?>
                                </td>
                                <?php endforeach; ?>
                                <td>
                                    <button class="btn btn-sm btn-warning" data-bs-toggle="modal"
                                        data-bs-target="#editModal" onclick='openEdit(<?= json_encode($row) ?>)'><i
                                            class="bi bi-pencil"></i> Sửa</button>

                                    <form method="POST" style="display:inline"
                                        onsubmit="return confirm('Bạn có chắc chắn muốn xóa?')">
                                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= htmlspecialchars($row[$idField]) ?>">
                                        <button type="submit" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i>
                                            Xóa</button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Add -->
        <div class="modal fade" id="addModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form id="addForm" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
                        <input type="hidden" name="action" value="add">
                        <div class="modal-header">
                            <h5 class="modal-title">Thêm <?= ucfirst($table) ?></h5><button type="button"
                                class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="addFormBody"></div>
                        <div class="modal-footer"><button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Đóng</button><button type="submit"
                                class="btn btn-primary">Thêm</button></div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal Edit -->
        <div class="modal fade" id="editModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form id="editForm" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="id" id="editId" value="">
                        <div class="modal-header">
                            <h5 class="modal-title">Sửa <?= ucfirst($table) ?></h5><button type="button"
                                class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="editFormBody"></div>
                        <div class="modal-footer"><button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Đóng</button><button type="submit" class="btn btn-primary">Cập
                                Nhật</button></div>
                    </form>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script>
        const table = <?= json_encode($table) ?>;
        const fieldsMap = <?= json_encode($fieldsMap) ?>;
        const idField = <?= json_encode($idField) ?>;

        function makeFieldHTML(name, label, value = '') {
            if (name === 'anhMonAn' || name === 'anhsp') {
                return `
        <div class="mb-3">
            <label class="form-label">${label}</label>
            <input type="file" class="form-control" name="${name}" accept="image/*">
            ${value ? `<div class="mt-2"><img src="uploads/${value}" style="width:120px"></div>` : ''}
        </div>`;
            }


            let type = 'text';
            if (name === 'giaMonAn' || name === 'giaGiam' || name === 'tienLuong' || name === 'soNguoi') type =
                'number';
            if (name === 'ngayVaoLam' || name === 'ngayDatBan') type = 'date';
            if (name === 'matKhau') type = 'password';
            if (name === 'trangThai') {
                return `<div class="mb-3"><label class="form-label">${label}</label><select class="form-control" name="${name}"><option value="Trống" ${value === 'Trống' ? 'selected' : ''}>Trống</option><option value="Có khách" ${value === 'Có khách' ? 'selected' : ''}>Có khách</option><option value="Bảo trì" ${value === 'Bảo trì' ? 'selected' : ''}>Bảo trì</option></select></div>`;
            }
            if (name === 'soNguoi') {
                return `<div class="mb-3"><label class="form-label">${label}</label><input type="number" class="form-control" name="${name}" value="${value}" min="1" required></div>`;
            }

            return `<div class="mb-3"><label class="form-label">${label}</label><input type="${type}" class="form-control" name="${name}" value="${value}"></div>`;
        }

        document.getElementById('addModal').addEventListener('show.bs.modal', function() {
            let html = '';
            for (let [field, label] of Object.entries(fieldsMap[table])) {
                html += makeFieldHTML(field, label);
            }
            document.getElementById('addFormBody').innerHTML = html;
        });

        function openEdit(row) {
            document.getElementById('editId').value = row[idField];
            let html = '';
            for (let [field, label] of Object.entries(fieldsMap[table])) {
                html += makeFieldHTML(field, label, row[field] || '');
            }
            document.getElementById('editFormBody').innerHTML = html;
        }
        </script>
    </body>

    </html>