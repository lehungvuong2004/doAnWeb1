<?php
include "../src/database/database.php";

$db = new connect();
$sql = "SELECT * FROM sanpham";

$result = $db->select($sql);   // dùng select() mới đúng

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;   // CHỈ lấy mã sản phẩm
    }
}

// echo $data;
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
