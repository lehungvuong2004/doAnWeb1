<?php 
    include "../src/database/database.php";
    $db = new connect();

    //  sắp xếp theo giá 

            $db->connect(); 
   
    
    $mysqli = $db->select("SELECT * FROM sanphamall");   
    while ($row = $mysqli->fetch_assoc()) {

        $data[] = $row;
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    
?>