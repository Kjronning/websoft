<?php
include '../view/header.php';

$host = 'localhost';
$username = 'root';
$password = '';
$database_name = 'websoft';

$connection = new mysqli($host, $username, $password, $database_name);

if ($connection->connect_error){
    die('Connection Error ('. $connection->connect_error .')');
}

$query_label = $_POST["insert_label_input"];
$query_description = $_POST["insert_description_input"];

$sql = $connection->prepare("INSERT INTO tech (label, description) VALUES (?, ?)");
$sql->bind_param("ss",$query_label,$query_description);
$sql->execute();
$sql->close();
$connection->close();

include '../view/footer.php';
