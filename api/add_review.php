<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// 1. Nhúng file kết nối
include "../src/database/database.php";

// 2. PHẢI khởi tạo đối tượng từ class connect
$db = new connect(); 
$mysqli = $db->getMysqli(); 

// 3. Lấy dữ liệu JSON từ React gửi lên
$data = json_decode(file_get_contents("php://input"), true);

$masp = $data['masp'] ?? null;
$soSao = $data['soSao'] ?? null;
$noiDung = $data['noiDung'] ?? null;
$maTaiKhoan = $data['maTaiKhoan'] ?? null;

// Kiểm tra dữ liệu đầu vào cơ bản
if (!$masp || !$soSao || !$noiDung) {
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ nội dung và số sao"]);
    exit;
}

try {
    // 4. Kiểm tra chính xác tên bảng là 'danhgia' (theo ảnh phpMyAdmin của bạn)
    $sql = "INSERT INTO danhgia (maTaiKhoan, masp, soSao, noiDung, ngayDanhGia) VALUES (?, ?, ?, ?, NOW())";
    
    $stmt = $mysqli->prepare($sql);
    
    // "iiis" tương ứng: maTaiKhoan (int), masp (int), soSao (int), noiDung (string)
    $stmt->bind_param("iiis", $maTaiKhoan, $masp, $soSao, $noiDung);
    
    $ok = $stmt->execute();
    
    echo json_encode(["success" => $ok]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Lỗi SQL: " . $e->getMessage()]);
}
?>