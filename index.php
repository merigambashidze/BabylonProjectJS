<html>

<head>
    <meta charset="utf-8">
    <title>ცხრილის ვიზუალური სისტემა</title>
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="scripts/lib/babylon.js"></script>
    <script src="scripts/lib/hand.js"></script>
    <script src="scripts/lib/jquery-1.12.4.min.js"></script>


</head>

<body>

    <canvas id="renderCanvas"></canvas>



    <div id="cap">მიმდინარეობს შესვენება. ნაჩვენებია შემდეგი საათის ცხრილი</div>
    <div id="dro">
        <span id="shesacvleli_paneli" style="display:none;">
            <input type="text" id="input_hours" class="inputs">  :  
            <input type="text" id="input_minutes" class="inputs">  :  
            <input type="text" id="input_seconds" class="inputs">
            <br>
            <input type="button" value="შენახვა" onclick="save_time_change();" class="">
           
            <input value="დაბრუნება" type="button" onclick="discard_time_change();" class="">
        </span>
        <span id="shecvlili_dro" style="display: none;">
        <span id="changed_hours">12</span> :
        <span id="changed_minutes">24</span> :
        <span id="changed_seconds">32</span>
        <br>
        <input value="რეალური დრო" type="button"  onclick="reset_time();" class="">
        </span>
        <span id="tavdapirveli_dro" >
            <span id="hours">07</span> :
        <span id="minutes">29</span> :
        <span id="seconds">12</span>
        <br>
        <input value="შეცვლა" type="button" onclick="change_time();" >
        </span>
    </div>

    <div id="dge">
        <div id="dge_span" onclick="daychange();" >
        </div>
    </div>

    <div id="hidd_time" style="display:none">
        <?php   
            date_default_timezone_set('Asia/Tbilisi');
            $date = date(DATE_RFC822, time());
            $array=explode(" ",$date);
            //get hh/mm/ss
            $dro=$array[4];
            //get week day
            $dge=substr($array[0],0,3);
            echo $dro;
        ?>
    </div>
    <div id="hidd_day" style="display:none">
        <?php
            echo $dge;
        ?>
    </div>
       
        <script src="scripts/functions.js"></script>
    <script src="scripts/timing.js"></script>
    <script src="scripts/create_scene.js"></script>
    
    <script src="scripts/load_meshes.js"></script>
    <div id="content">
    </div>
</body>

</html>