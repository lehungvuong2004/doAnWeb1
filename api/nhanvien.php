<?php 

include "../src/database/database.php";
$db = new connect();
$sql = "SELECT * FROM nhanvien";
$result = $db->select($sql);  
$arr = [];
while ($row = $result->fetch_assoc()) { 
    $arr[] = $row;
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);


?>