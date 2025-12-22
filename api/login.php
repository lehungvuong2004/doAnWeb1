<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
header('Content-Type: application/json'); 

include '../src/database/database.php';

$db = new connect();
$mysqli = $db->getMysqli();

$username = $_POST['username'] ?? '';
$passwd   = $_POST['passwd'] ?? '';

if (!$username || !$passwd) {
    echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập đầy đủ thông tin']);
    exit;
}

$username = $mysqli->real_escape_string($username);

// Lấy user
$sql = "SELECT * FROM TaiKhoan WHERE tenDangNhap = '$username' LIMIT 1";
$result = $mysqli->query($sql);

if ($result && $result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if (password_verify($passwd, $user['matKhau'])) {

        // Kiểm tra role admin (có thể là tên + vai trò)
        if ($user['tenDangNhap'] === 'admin123') {
            echo json_encode([
                'status' => 'success',
                'user' => $user,
                'redirect' => '/dashboard.php'
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'success',
                'user' => $user,
                'redirect' => '/' // trang chủ ReactJS
            ]);
            exit;
        }
    }
}

// Sai mật khẩu hoặc không tồn tại
echo json_encode([
    'status' => 'error',
    'message' => 'Tên đăng nhập hoặc mật khẩu không đúng'
]);
exit;
?>