<?php
// Cho phép request từ mọi nguồn (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "../src/database/database.php";

$db = new connect();
$sql = "SELECT * FROM sanpham";

$result = $db->select($sql); 
$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;  
    }
}

// Trả về JSON với ký tự Unicode giữ nguyên
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
