<?php
include '../view/header.php';


$query_input = filter_input(INPUT_POST, 'search_input');

$host = 'localhost';
$username = 'root';
$password = '';
$database_name = 'websoft';

$connection = new mysqli($host, $username, $password, $database_name);

if ($connection->connect_error){
    die('Connection Error ('. $connection->connect_error .')');
}

//$connection->autocommit(FALSE);
$sql = $connection->prepare("SELECT * FROM tech 
WHERE (id LIKE CONCAT('%',?,'%')
    OR label LIKE CONCAT('%',?,'%')
    OR description LIKE CONCAT('%',?,'%')
)");

$sql->bind_param("iss",$query_input, $query_input, $query_input);
$sql->execute();

//$connection->autocommit(TRUE);

$result = $sql->get_result();

echo "<table style='border: solid 1px black'><thead><tr><th>label</th><th>description</th><th>id</th></tr></thead>";
if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["label"] . "</td><td>" . $row["description"] . "</td>><td>" . $row["id"] . "</td></tr>";
    }
}
if(!$result){
    echo "<tr><td>empty</td></tr></table>";
    die("Invalid query: " . $connection->error);
}
echo "</table>";

include '../view/footer.php';


