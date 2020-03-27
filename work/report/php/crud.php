<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database_name = 'websoft';
$function_callback = null;

$connection = new mysqli($host, $username, $password, $database_name);


if (isset($_POST['function_callback']))
    $function_callback = $_POST['function_callback'];

if ($connection->connect_error) {
    die('Connection Error (' . $connection->connect_error . ')');
}

function create($create_label, $create_description)
{
    global $function_callback;
    if ($function_callback != 'create')
        return;
    global $connection;

    $sql = $connection->prepare("INSERT INTO tech (label, description) VALUES (?, ?)");
    $sql->bind_param("ss", $create_label, $create_description);
    $sql->execute();
    $sql->close();
}

function read($search_input)
{
    global $function_callback;
    if ($function_callback != 'read')
        return;
    global $connection;

    $sql = $connection->prepare("SELECT * FROM tech 
WHERE (id LIKE CONCAT('%',?,'%')
    OR label LIKE CONCAT('%',?,'%')
    OR description LIKE CONCAT('%',?,'%')
)");

    $sql->bind_param("iss", $search_input, $search_input, $search_input);
    $sql->execute();
    echo "<table style='border: solid 1px black'><thead><tr><th>label</th><th>description</th><th>id</th></tr></thead>";
    if (($result = $sql->get_result())->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["label"] . "</td><td>" . $row["description"] . "</td>><td>" . $row["id"] . "</td></tr>";
        }
    }
    echo "</table>";
}

function update($update_label, $update_description, $update_id)
{
    global $function_callback;
    if ($function_callback != 'update')
        return;
    global $connection;
    $sql = $connection->prepare("UPDATE tech 
            SET
                 label = ?,
                description = ? 
            WHERE id = ?");

    $sql->bind_param("ssi", $update_label, $update_description, $update_id);
    $sql->execute();
}

function delete($delete_id)
{
    global $function_callback;
    if ($function_callback != 'delete')
        return;
    global $connection;
    $sql = $connection->prepare("DELETE FROM tech WHERE id = ?");
    $sql->bind_param("i", $delete_id);
    $sql->execute();
    $sql->close();
}

if(isset($_POST['insert_label'],$_POST['insert_description']))
    create($_POST['insert_label'],$_POST['insert_description']);

if(isset($_POST['read_input']))
    read($_POST['read_input']);

if(isset($_POST['update_label'],$_POST['update_description'],$_POST['update_id']))
    update($_POST['update_label'],$_POST['update_description'],$_POST['update_id']);

if(isset($_POST['delete_id']))
    delete($_POST['delete_id']);





