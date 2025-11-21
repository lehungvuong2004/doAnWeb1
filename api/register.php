<?php
// Kết nối database


// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
include "../src/database/database.php";
$db = new connect();
$mysqli = $db->getMysqli();
// Lấy dữ liệu từ React
$username = $_POST['username'];
$email    = $_POST['email'];
$passwd   = $_POST['passwd'];
// Check rỗng
if ($username === '' || $email === '' || $passwd === '') {
    echo "empty";
    exit;
}
// Escape tránh lỗi SQL
$username = $mysqli->real_escape_string($username);
$email    = $mysqli->real_escape_string($email);
$passwd   = $mysqli->real_escape_string($passwd);
// Kiểm tra username tồn tại
$checkSql = "
    SELECT maTaiKhoan 
    FROM taikhoan 
    WHERE tenDangNhap = '$username'
    LIMIT 1
";

$checkRes = $mysqli->query($checkSql);
if ($checkRes && $checkRes->num_rows > 0) {
    echo "exist";
    exit;
}
// Hash mật khẩu
$hashed = password_hash($passwd, PASSWORD_DEFAULT);
// Vai trò
$vaiTro = "Khách hàng";
// INSERT — KHÔNG DÙNG PREPARE, KHÔNG CÓ ???
$sql = "
    INSERT INTO taikhoan (tenNguoiDung, tenDangNhap, matKhau, email, vaiTro)
    VALUES ('$username', '$username', '$hashed', '$email', '$vaiTro')
";
if ($mysqli->query($sql)) {
    echo "success";
} else {
    error_log("Insert failed: " . $mysqli->error);
    echo "error";
}
exit;
?>
