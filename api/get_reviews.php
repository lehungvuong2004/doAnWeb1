<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "../src/database/database.php";

$db = new connect();
$mysqli = $db->getMysqli();

// Lấy mã sản phẩm từ URL (ví dụ: get_reviews.php?masp=6)
$masp = $_GET['masp'] ?? 0;

try {
    // Truy vấn lấy các đánh giá của sản phẩm này, xếp mới nhất lên đầu
    $sql = "SELECT * FROM danhgia WHERE masp = ? ORDER BY ngayDanhGia DESC";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $masp);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $reviews = [];
    
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }

    // Trả về mảng JSON cho ReactJS
    echo json_encode($reviews, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(["message" => $e->getMessage()]);
}
?>