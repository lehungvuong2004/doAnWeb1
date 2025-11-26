<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
include "../src/database/database.php";
$db = new connect();
$mysqli = $db->getMysqli();
$username = $_POST['username'] ?? '';
$passwd   = $_POST['passwd'] ?? '';

if ($username === '' || $passwd === '') {
    echo json_encode(["status" => "error", "message" => "Thiếu username hoặc password"]);
    exit;
}
$stmt = $mysqli->prepare("SELECT maTaiKhoan, tenDangNhap, matKhau FROM taikhoan WHERE tenDangNhap = ? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Tài khoản không tồn tại"]);
    exit;
}

$user = $result->fetch_assoc();

// kiểm tra password hash
if (!password_verify($passwd, $user['matKhau'])) {
    echo json_encode(["status" => "error", "message" => "Sai mật khẩu"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => "Đăng nhập thành công",
    "user" => [
        "id" => $user['maTaiKhoan'],
        "username" => $user['tenDangNhap']
    ]
]);
exit;
?>
