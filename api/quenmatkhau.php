<?php
require '../vendor/autoload.php';
include '../src/database/database.php';
$db = new connect();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$data = json_decode(file_get_contents("php://input"));
if (!$data || empty($data->email)) {
    echo json_encode(['success' => false, 'message' => 'Email không hợp lệ'], JSON_UNESCAPED_UNICODE);
    exit();
}

$conn = $db->getMysqli();
$email = mysqli_real_escape_string($conn, $data->email);

$result = $db->select("SELECT * FROM taikhoan WHERE email='$email'");
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Email chưa đăng ký'], JSON_UNESCAPED_UNICODE);
    exit();
}

$otp = rand(100000, 999999);
$expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));
$db->command("UPDATE taikhoan SET reset_code='$otp', reset_expiry='$expiry' WHERE email='$email'");

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'khabanh5418@gmail.com';
    $mail->Password = 'bodo pgxj iord esnn';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('khabanh5418@gmail.com', 'Reset Password');
    $mail->addAddress($email);
    $mail->Subject = 'Ma OTP dat lai mat khau';
    $mail->Body = "Ma OTP cua ban la: $otp. Het han sau 10 phut.";
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mã OTP đã gửi đến email của bạn'], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Gửi mail thất bại: ' . $mail->ErrorInfo], JSON_UNESCAPED_UNICODE);
}
?>