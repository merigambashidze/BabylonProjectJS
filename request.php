<?php
if(isset($_GET["saati"])&&isset($_GET["dge"])){
    if(!empty($_GET["saati"])&&!empty($_GET["dge"])){
        $saati=$_GET["saati"];
        $dge=$_GET["dge"];
        include("database.php");
        $query="SELECT * FROM cxrilebi WHERE saati='".$saati."' AND dge='".$dge."'";
        $result=mysqli_query($connection,$query);
while($row=mysqli_fetch_assoc($result)){
echo "".$row["auditoria"]."^".$row["leqcia"]."^".$row["leqtori"]."^".$row["jgufi"].";";
}
    }else{
        echo "ველები არასწორადაა შევსებული";
    }
}else{
    echo "ველები არასწორადაა შევსებული";
}



?>