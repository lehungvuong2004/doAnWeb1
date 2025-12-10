<?php 
    include "../src/database/database.php";
     

    $db = new connect();
    $mysqli = $db->select("SELECT * FROM sanphamall");   

    while ($row = $mysqli->fetch_assoc()) {

        $data[] = $row;
    }
    $min = $_GET['min_price'] ?? null;
    $max = $_GET['max_price'] ?? null;
    $type = $_GET['type'] ?? null;
    $nation = $_GET['nation'] ?? null;
    $sort = $_GET['sort'] ?? null;

    $sql = "SELECT * FROM sanpham WHERE 1";

   if ($min) $sql .= " AND giasp >= $min";
   if ($max) $sql .= " AND giasp <= $max";
   if ($type) $sql .= " AND loai = '$type'";
   if ($nation) $sql .= " AND quocgia = '$nation'";
   if ($sort == "asc") $sql .= " ORDER BY giasp ASC";
if ($sort == "desc") $sql .= " ORDER BY giasp DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>