<?php
include '../view/header.php';


$id_input = filter_input(INPUT_POST, 'update_id');
$label_input = filter_input(INPUT_POST, 'update_label');
$description_input = filter_input(INPUT_POST, 'update_description');


$host = 'localhost';
$username = 'root';
$password = '';
$database_name = 'websoft';

$connection = new mysqli($host, $username, $password, $database_name);

if ($connection->connect_error){
    die('Connection Error ('. $connection->connect_error .')');
}

$sql = $connection->prepare("UPDATE tech 
            SET
                 label = ?,
                description = ? 
            WHERE id = ?");

$sql->bind_param("ssi",$label_input,$description_input,$id_input);
$sql->execute();


echo "executed";

$sql->close();
$connection->close();
include '../view/footer.php';

