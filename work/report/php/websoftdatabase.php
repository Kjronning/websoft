<?php
include '../view/header.php';
?>
<form name="search_form" method="post" action="search.php">
    Search <br>
    Keyword: <input name="search_input" type="text">
    <input type="submit" value="Submit">
</form><br>
<form name="update_form" method="post" action="update.php">
    Update <br>
    id: <input name="update_id" type="number">
    Label: <input name="update_label" type="text">
    Description: <input name="update_description" type="text">
    <input type="submit" value="Submit">
</form>

    <form name="insert_form" method="post" action="create.php">
        Insert <br>
        Label: <input name="insert_label_input" type="text">
        Description: <input name="insert_description_input" type="text">
        <input type="submit" value="Submit">
    </form>

<?php
include '../view/footer.php';
?>