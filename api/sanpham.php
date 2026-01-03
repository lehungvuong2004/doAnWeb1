<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Dùng chung file kết nối với Sanphamall.php của bạn
include "../src/database/database.php"; 
$db = new connect();
$db->connect();

// Lấy masp từ URL (ví dụ: sanpham.php?masp=6)
$masp = $_GET['masp'] ?? null;

if ($masp) {
    // Chỉ lấy đúng sản phẩm có mã này
    $mysqli = $db->select("SELECT * FROM sanphamall WHERE masp = '$masp' LIMIT 1");
    $product = $mysqli->fetch_assoc();
    
    echo json_encode($product, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["message" => "Không tìm thấy mã sản phẩm"]);
}
?>