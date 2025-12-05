<?php
include '../src/database/database.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"));
if (!$data || empty($data->email) || empty($data->otp) || empty($data->newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Thiếu thông tin'], JSON_UNESCAPED_UNICODE);
    exit();
}
$db = new connect();
$conn = $db->getMysqli();
$email = mysqli_real_escape_string($conn, $data->email);
$otp = mysqli_real_escape_string($conn, $data->otp);
$newPassword = $data->newPassword;
$result = $db->select("SELECT * FROM taikhoan WHERE email='$email'");
$user = $result->fetch_assoc();
if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Email không tồn tại'], JSON_UNESCAPED_UNICODE);
    exit();
}
if ($user['reset_code'] != $otp) {
    echo json_encode(['success' => false, 'message' => 'OTP không hợp lệ'], JSON_UNESCAPED_UNICODE);
    exit();
}
if (strtotime($user['reset_expiry']) < time()) {
    echo json_encode(['success' => false, 'message' => 'OTP đã hết hạn'], JSON_UNESCAPED_UNICODE);
    exit();
}
$hashed = password_hash($newPassword, PASSWORD_DEFAULT);
$db->command("UPDATE taikhoan SET matKhau='$hashed', reset_code=NULL, reset_expiry=NULL WHERE email='$email'");

echo json_encode(['success' => true, 'message' => 'Đổi mật khẩu thành công'], JSON_UNESCAPED_UNICODE);
?>