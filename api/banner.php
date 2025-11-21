<?php
include "../src/database/database.php";
$db = new connect();
$sql = "SELECT * FROM banner";
$result = $db->select($sql);
$data = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
echo json_encode($data);