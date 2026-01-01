<?php
include '../src/database/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

// 1. Kiểm tra dữ liệu gửi lên
if (!$data || empty($data->userId) || empty($data->current_password) || empty($data->new_password)) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng nhập đủ thông tin!'], JSON_UNESCAPED_UNICODE);
    exit();
}

$db = new connect();
$conn = $db->getMysqli();

// 2. Escape dữ liệu
$userId = mysqli_real_escape_string($conn, $data->userId);
$currentPassword = $data->current_password;
$newPassword = $data->new_password;

// 3. Lấy mật khẩu cũ từ DB
// SỬA: Dùng maTaiKhoan và lấy cột matKhau
$query = "SELECT matKhau FROM taikhoan WHERE maTaiKhoan = '$userId' LIMIT 1";
$result = $db->select($query);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $hash_trong_db = $user['matKhau'];

    // 4. Kiểm tra mật khẩu cũ
    // Lưu ý: Nếu DB bạn đang lưu mật khẩu thường (không mã hóa) thì dùng: if ($currentPassword == $hash_trong_db)
    if (password_verify($currentPassword, $hash_trong_db)) {
        
        // 5. Mã hóa mật khẩu mới
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // 6. Cập nhật mật khẩu mới
        // SỬA: Update cột matKhau theo maTaiKhoan
        $updateQuery = "UPDATE taikhoan SET matKhau = '$hashedNewPassword' WHERE maTaiKhoan = '$userId'";
        
        $check = $db->command($updateQuery);

        if ($check) {
            echo json_encode(['success' => true, 'message' => 'Đổi mật khẩu thành công!'], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống, không cập nhật được.'], JSON_UNESCAPED_UNICODE);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Mật khẩu hiện tại không đúng!'], JSON_UNESCAPED_UNICODE);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Tài khoản không tồn tại (Sai ID)!'], JSON_UNESCAPED_UNICODE);
}
?>