<?php
include '../view/header.php';
?>
    <link rel="stylesheet" href="../css/tabs.css">
    <div class="tab">
        <button class="tablinks" onClick="openCRUD(event, 'create')">Create</button>
        <button class="tablinks" onClick="openCRUD(event, 'read')">Read</button>
        <button class="tablinks" onClick="openCRUD(event, 'update')">Update</button>
        <button class="tablinks" onClick="openCRUD(event, 'delete')">Delete</button>
    </div>

    <div id="create" class="tabcontent">
        <form name="insert_form" method="post" action="">
            <table class="crudtable">
                <tr>
                    <td>Label:</td>
                    <td><input name="insert_label" type="text"></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td><input name="insert_description" type="text"></td>
                </tr>
            </table>
            <input type="hidden" name="function_callback" value="create">
            <input type="submit" value="Submit">
        </form>
    </div>
    <div id="read" class="tabcontent">
        <form name="search_form" method="post" action="">
            <table>
                <tr>
                    <td>Keyword:</td>
                    <td><input name="read_input" type="text"></td>
                </tr>
            </table>
            <input type="hidden" name="function_callback" value="read">
            <input type="submit" value="Submit">
        </form>
    </div>
    <div id="update" class="tabcontent">
        <form name="update_form" method="post" action="">
            <table>
                <tr>
                    <td>Id:</td>
                    <td><input name="update_id" type="number"></td>
                </tr>
                <tr>
                    <td>Label:</td>
                    <td><input name="update_label" type="text"></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td><input name="update_description" type="text"></td>
                </tr>
            </table>
            <input type="hidden" name="function_callback" value="update">
            <input type="submit" value="Submit">
        </form>
    </div>
    <div id="delete" class="tabcontent">
        <form name="delete_form" method="post" action="">
            <table>
                <tr>
                    <td>Id:</td>
                    <td><input name="delete_id" type="number"></td>
                </tr>
            </table>
            <input type="hidden" name="function_callback" value="delete">
            <input type="submit" value="submit">
        </form>
    </div>
    <script src="../js/tabs.js"></script>

<?php
include '../php/crud.php';
include '../view/footer.php';
?>