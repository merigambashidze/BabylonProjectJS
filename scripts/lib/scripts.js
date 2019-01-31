        //Functions
        //Scene
        //Calling Functions

//------------------- DOM Elements----------------
var dge_span=document.getElementById("dge_span");
var hidd_dge = document.getElementById("dge_hidd");
var php_time = document.getElementById("hidd");
var cap=document.getElementById("cap");
var tavdapirveli_dro=document.getElementById("tavdapirveli_dro");
var shesacvleli_dro = document.getElementById("shecvlili_dro");
var shesacvleli_paneli=document.getElementById("shesacvleli_paneli");
var input_hours=document.getElementById("input_hours");
var input_minutes=document.getElementById("input_minutes");
var input_seconds = document.getElementById("input_seconds");
var canvas = document.querySelector("#renderCanvas");


        //-------------------Scene----------------------
        
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        //------------- Camera----------
        var camera = new BABYLON.ArcRotateCamera("Camera", 20, 30, 60, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(15, 0, 20));
        scene.activeCamera.attachControl(canvas, false);


        var beforeRenderFunction = function () {
            // Camera doesn't go below the ground
            if (camera.beta < 0.1)
                camera.beta = 0.1;
            else if (camera.beta > (Math.PI / 2) * 0.99)
                camera.beta = (Math.PI / 2) * 0.99;

            if (camera.radius > 30)
                camera.radius = 30;

            if (camera.radius < 5)
                camera.radius = 5;
        };

        scene.registerBeforeRender(beforeRenderFunction);



        //-------------Lights-----------------
        var main_light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
        main_light.intensity = 2;
        main_light.position = camera.position;

        var night_light_blue = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
        night_light_blue.diffuse = new BABYLON.Color3(14, 229, 221);
        night_light_blue.specular = new BABYLON.Color3(1, 1, 1);
        night_light_blue.position = new BABYLON.Vector3(1, 1, 0);
        night_light_blue.intensity = 0.005;


        var night_light_white = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
        night_light_white.diffuse = new BABYLON.Color3(255, 255, 255);
        night_light_white.specular = new BABYLON.Color3(1, 1, 1);
        night_light_white.intensity = 0.005;
        night_light_white.position = new BABYLON.Vector3(15, 3, 0);

        // ---------------------Skybox Materials------------------------------

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);

        var skyboxMorning = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMorning.backFaceCulling = false;
        skyboxMorning.reflectionTexture = new BABYLON.CubeTexture("sky/TropicalSunnyDay", scene);
        skyboxMorning.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMorning.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMorning.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMorning.disableLighting = true;

        var skyboxSunset = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxSunset.backFaceCulling = false;
        skyboxSunset.reflectionTexture = new BABYLON.CubeTexture("sky/SunSet", scene);
        skyboxSunset.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxSunset.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxSunset.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxSunset.disableLighting = true;

        var skyboxNight = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxNight.backFaceCulling = false;
        skyboxNight.reflectionTexture = new BABYLON.CubeTexture("sky/FullMoon", scene);
        skyboxNight.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxNight.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxNight.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxNight.disableLighting = true;


            //-------------------- Import Meshes---------------------

var txtPlanes = [1, 1, 1, 1];

        function simple(newMeshes, num1) {
            var i = 0;
            var planes = [];
            while (i < newMeshes.length) {
                newMeshes[i].isPickable = true;
                if (newMeshes[i].name.length == 3) {
                    var plane = makeTextPlane(newMeshes[i].name, "yellow", 1);
                    plane.position = newMeshes[i].position;
                    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
                    planes.push(plane);

                }
                i += 1;
            }
            txtPlanes.splice(num1, 1, planes);
        }
        var makeTextPlane = function (text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            return plane;
        };
        var sartulebi = [1, 1, 1, 1, 1];
        var mat1;
        var mat2;
        var import_meshes = 0;

        //----------------------Loading Meshes========================
        function ifloaded() {
            import_meshes += 1;
            if (import_meshes == 7) {
                main_func();
            }
        }
        BABYLON.SceneLoader.ImportMesh("", "model/", "7.babylon", scene, function (newMeshes) {

            mat1 = newMeshes[0].material;
            newMeshes[0].dispose();
            mat2 = newMeshes[1].material;
            newMeshes[1].dispose();
            ifloaded();
        });
     /*   BABYLON.SceneLoader.ImportMesh("", "model/", "4.babylon", scene, function (newMeshes) {

            simple(newMeshes, 0);
            sartulebi.splice(0, 1, newMeshes);
            
            ifloaded();


        });*/
        BABYLON.SceneLoader.ImportMesh("", "model/", "3.babylon", scene, function (newMeshes) {

            simple(newMeshes, 1);
            sartulebi.splice(1, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "2.babylon", scene, function (newMeshes) {

            simple(newMeshes, 2);
            sartulebi.splice(2, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "1.babylon", scene, function (newMeshes) {

            simple(newMeshes, 3);
            sartulebi.splice(3, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "5.babylon", scene, function (newMeshes) {

            sartulebi.splice(4, 1, newMeshes);
            
            ifloaded();
        });
    /*    BABYLON.SceneLoader.ImportMesh("", "model/", "6.babylon", scene, function (newMeshes) {
            ifloaded();
        });*/
        //---------------- dge------------------

        var dgeebi1 = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"];
        var dgeebi = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var saatebi = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "20:00", "21:00", "22:00"];
        var hidd_dge = document.getElementById("dge_hidd").innerHTML;
        hidd_dge = hidd_dge.trim();
      
        var dge1 = dgeebi.indexOf(hidd_dge);
      dge_span.innerHTML = dgeebi1[dge1];

        function daychange() {
           
            document.getElementById("dge_span").innerHTML = '<select id="day_select"onchange="change1(this);"><option value="0">ორშაბათი</option><option value="1">სამშაბათი</option><option value="2">ოთხშაბათი</option><option value="3">ხუთშაბათი</option><option value="4">პარასკევი</option><option value="5">შაბათი</option></select>';
           
          //  document.getElementById("dge_span").onclick = function () {}
        }

        function change1(me) {
            document.getElementById("dge_span").innerHTML =$("#day_select option:selected").text();
            dge1 = $("#day_select option:selected").val()
            if (env == 2) {
                if (mm1 >= 45) {
                    shesveneba(hh1, dge1);
                    if ((hh1 < 21) && (hh1 > 8)) {}
                } else {
                    shesveneba(hh1, dge1);
                }
            } else {
                if (mm >= 45) {
                    shesveneba(hh, dge1);
                    if ((hh < 21) && (hh > 8)) {}
                } else {
                    shesveneba(hh, dge1);
                }
            }

        }
        //--------------------------saatebi-------------------------
        var php_time = document.getElementById("hidd").innerHTML;
        var arr_time = php_time.split(':');
        var ss = parseInt(arr_time[2], 10);
        var mm = parseInt(arr_time[1], 10);
        var hh = parseInt(arr_time[0], 10);
       
        $("#hours").html(hh);
        $("#seconds").html(ss);
        $("#minutes").html(mm);
        var hh1;
        var mm1;
        var ss1;

        var env = 3;

        var leq = {};

        function updatetime1() {
            ss1++;
            if (ss1 < 10) {
                ss1 = '0' + ss1;
            }
            if (ss1 == 60) {
                ss1 = '00';
                mm1++;
                if (env == 2) {
                    if (mm1 == 45) {
                        shesveneba(hh1, dge1);
                        if ((hh1 < 21) && (hh1 > 8)) {
                            document.getElementById("cap").style.display = "block";
                        }
                    }
                }

                if (mm1 < 10) {
                    mm1 = '0' + mm1;
                }
                if (mm1 == 60) {
                    mm1 = '00';
                    hh1++;
                    if (env == 2) {
                        setEnv(hh1);
                        document.getElementById("cap").style.display = "none";
                    }

                    if (hh1 < 10) {
                        hh1 = '0' + hh1;
                    }
                    if (hh1 == 24) {
                        hh1 = '00';
                    }

                    $("#hours1").html(hh1);
                }
                $("#minutes1").html(mm1);
            }
            $("#seconds1").html(ss1);
        }
var skyme=0;
        function updatetime() {
            ss++;
            if (ss < 10) {
                ss = '0' + ss;
            }
            if (ss == 60) {
                ss = '00';
                mm++;
                if (env == 3) {
                    if (mm == 45) {
                        shesveneba(hh, dge1);
                        if ((hh < 21) && (hh > 8)) {
                            document.getElementById("cap").style.display = "block";
                        }
                    }
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }
                if (mm == 60) {
                    mm = '00';
                    hh++;
                    if (env == 3) {
                        setEnv(hh);
                        document.getElementById("cap").style.display = "none";
                    }

                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (hh == 24) {
                        hh = '00';
                    }

                    $("#hours").html(hh);
                }
                $("#minutes").html(mm);
            }
            $("#seconds").html(ss);
        }
    
        function setEnv(hh2) {
           
            if ((hh2 >= 7) && (hh2 < 18)) {
                if (skyme != 1) {
                   skyme = 1;

                    skybox.material = skyboxMorning;
                    main_light.intensity = 5;
                    changemat(mat2);
                    night_light_blue.setEnabled(false);
                    night_light_white.setEnabled(false);
                }
            }
            if ((hh2 >= 18) && (hh2 < 22)) {
                if (skyme != 2) {
                    skyme = 2;

                    skybox.material = skyboxSunset;
                    changemat(mat2);
                    main_light.intensity = 3;
                    night_light_blue.setEnabled(false);
                    night_light_white.setEnabled(false);
                }
            }
            if ((hh2 >= 22) || (hh2 < 7)) {
                if (skyme != 3) {
                    
                    
                    changemat(mat1);
                    skyme = 3;
                    skybox.material = skyboxNight;
                    main_light.intensity = 0.003;
                    night_light_blue.setEnabled(true);
                    night_light_white.setEnabled(true);
                }

            }
        }

        function shesveneba(hh3, dd) {
            var currhh3 = hh3 + 1;
            if ((currhh3 < 21) && (currhh3 > 8)) {
                
                $.ajax({
                    url: "leqciebi.php?dge=" + dd + "&saati=" + currhh3 + ""
                    , success: function (result) {
                        if (result) {
                            shevseba(result);
                        }else{
                            leq={};
                        }
                    }
                });
            }else{
                leq={};
            }
        }

        function changemat(mat) {
            var sart = 0;
            while (sart < 4) {
                var audit = 0;
                while (audit < sartulebi[sart].length) {
                    if (sartulebi[sart][audit].name.length == 3) {
                        sartulebi[sart][audit].material = mat;
                    }
                    audit += 1;
                }
                sart += 1;
            }
        }

        function shevseba(bla) {
            var new_leq = {};
            changemat(mat2);
          
            var res_arry = bla.split(";");
            res_arry.splice((res_arry.length - 1), 1);
            var amnt = 0;
            while (amnt < res_arry.length) {
                var me1 = 0;
                var splited1 = res_arry[amnt].split("^");
              
                new_leq[splited1[0]] = splited1;
             
                if (splited1[me1].substr(0, 1) == "1") {
                   
                    var meee = scene.getMeshByName(splited1[0]);
                    meee.material = mat1;
                }
                if (splited1[me1].substr(0, 1) == "2") {
                   
                    var meee = scene.getMeshByName(splited1[0]);
                    meee.material = mat1;
                }
                if (splited1[me1].substr(0, 1) == "3") {
                  
                    var meee = scene.getMeshByName(splited1[0]);
                    meee.material = mat1;
                }
                if (splited1[me1].substr(0, 1) == "4") {
                   
                    var meee = scene.getMeshByName(splited1[0]);
                    meee.material = mat1;
                }
                amnt += 1;
            }
            leq = new_leq;
        }

        function edit1() {
           
            document.getElementById("tavdapirveli_dro").style.display = "none";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "inline";
        }
        var time;

        function accept1() {
          
            hh1 = parseInt(document.getElementById("input_hours").value, 10);
            mm1 = parseInt(document.getElementById("input_minutes").value, 10);
            ss1 = parseInt(document.getElementById("input_seconds").value, 10);

            if ((hh1 >= 0) && (hh1 <= 23) && (mm1 >= 0) && (mm1 <= 59) && (ss1 >= 0) && (ss1 <= 59)) {
                $("#hours1").html(hh1);
                $("#seconds1").html(ss1);
                $("#minutes1").html(mm1);
                document.getElementById("tavdapirveli_dro").style.display = "none";
                document.getElementById("shecvlili_dro").style.display = "inline";
                document.getElementById("shesacvleli_paneli").style.display = "none";
                time = setInterval(updatetime1, 1000);
                env = 2;
                
                setEnv(hh1);

                if (mm1 >= 45) {

                    shesveneba(hh1);
                    if ((hh1 < 21) && (hh1 > 8)) {
                        document.getElementById("cap").style.display = "block";
                    }

                } else {
                    shesveneba(hh1 - 1);
                        document.getElementById("cap").style.display = "none";
                    
                }

            } else {
                reject1();
            }
        }

        function reject1() {
            
            document.getElementById("tavdapirveli_dro").style.display = "inline";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "none";

        }

        function reset1() {
            clearInterval(time);
        
            document.getElementById("tavdapirveli_dro").style.display = "inline";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "none";
            env = 3;
            setEnv(hh);
          
            if (mm >= 45) {
                shesveneba(hh);
                
                if ((hh < 21) && (hh > 8)) {
                    document.getElementById("cap").style.display = "block";
                }
            } else {
                document.getElementById("cap").style.display = "none";
                console.log("ss");
                shesveneba(hh - 1);
            }
        }

        //----------------Quick Access-------------------
        var qa1 = $('#quick-access1');
        var toggle1 = qa1.find('.toggle1');

        var showPanel1 = function () {
            if (!qa1.hasClass('animating')) {
                qa1.addClass('animating');

                qa1.animate({
                    'left': '+=1100'
                }, 250, function () {
                    qa1.addClass('on');
                    qa1.removeClass('animating');
                });
            }
        };
        var hidePanel1 = function () {
            if (!qa1.hasClass('animating')) {
                qa1.addClass('animating');

                qa1.animate({
                    'left': '-=1100'
                }, 250, function () {
                    qa1.removeClass('on');
                    qa1.removeClass('animating');
                });
            }
        };

        toggle1.click(function () {
            if (qa1.hasClass('on')) {
                hidePanel1();
            } else {
                showPanel1();
            }

            $(this).removeClass('hover');
        });
        //----------------Quick Access-------------------
                var input=document.getElementById("input");
var div=document.getElementById("content");
        var closs=document.getElementById("close");
        var qa = $('#quick-access');
        var toggle = qa.find('.toggle');

        var showPanel = function () {
            if (!qa.hasClass('animating')) {
                qa.addClass('animating');

                qa.animate({
                    'left': '+=800'
                }, 250, function () {
                    qa.addClass('on');
                    qa.removeClass('animating');
                });
            }
        };
        var hidePanel = function () {
            if (!qa.hasClass('animating')) {
                qa.addClass('animating');

                qa.animate({
                    'left': '-=800'
                }, 250, function () {
                    qa.removeClass('on');
                    qa.removeClass('animating');
                });
            }
        };

        toggle.click(function () {
            if (qa.hasClass('on')) {
                hidePanel();
            } else {
                showPanel();
            }

            $(this).removeClass('hover');
        });
var dzebna = document.getElementById("dzebna");
        document.getElementById("dzebna").onclick = function () {
            var dge_1 = $("#dge option:selected").val();
            var dge_2 = $("#dge1 option:selected").val();
            var saati_1 = $("#saati option:selected").val();
            var saati_2 = $("#saati1 option:selected").val();
            var leqtori = $("#leqtori").val();
            var leqcia = $("#leqcia").val();
            var jgufi = $("#jgufi").val();
            var auditoria = $("#auditoria").val();
            var query = "info.php?dge_1=" + dge_1 + "&dge_2=" + dge_2 + "&saati_1=" + saati_1 + "&saati_2=" + saati_2 + "";
            if (leqtori.length > 1) {
                query += "&leqtori=" + leqtori + "";
                
            }
            if (leqcia.length > 1) {
                query += "&leqcia=" + leqcia + "";
            }
            if (jgufi.length > 1) {
                query += "&jgufi=" + jgufi + "";
            }
            if (auditoria >= 100) {
                query += "&auditoria=" + auditoria + "";
            }
          
            $.ajax({
                url: query
                , success: function (result) {
                    var text = result.split(";");
                        text.splice((text.length - 1), 1);
                
                    if (text.length>1) {
                        var end = "<table><thead><tr><th>აუდიტორია:</th><th>ლექცია:</th><th>ლექტორი:</th><th>კგუფი:</th><th>ასაათი:</th><th>დღე:</th></tr></thead><tbody>";
                        var me = 0;
                        while (me < text.length) {
                            end += "<tr>";
                            var res = text[me].split("^");
                            
                            
                            
                            end += "<td>" + res[0] + "</td><td>" + res[1] + "</td><td>" + res[2] + " </td><td>" + res[3] + " </td><td>" + saatebi[parseInt(res[4], 10)] + " </td><td>" + dgeebi1[parseInt(res[5], 10)] + "</td>";
                            me += 1;
                            end += "</tr>";
                        }
                        end += "</tbody></table>";
                        div.style.display="block";
                        closs.style.display="block";
                        div.innerHTML = end;
                        var info = document.getElementById("info");
                         document.getElementById("info").innerHTML = "";
                    } else {
                        document.getElementById("info").innerHTML = "ჩანაწერი არ მოიძებნა";
                    }

                }
            });

        }

        

        //------------------Clicks-------------------------

$("canvas").hover(function(){
    window.onclick=blabla;
    
},function(){
    window.onclick=null;
    
})
        var swich = 0;
        
        
        function blabla(evt){
            var pickResult = scene.pick(evt.clientX, evt.clientY);
            
            var name = pickResult.pickedMesh.name;
            if (leq.hasOwnProperty(name)) {
                if (name.length == 3) {
                    
                    

var text ="<table><thead><tr><th>ლექცია</th><th>ლექტორი</th><th>ჯგუფი</th><th>აუდიტორია</th></tr><tbody><tr>";

                    text += "<td>" + leq[name][1] + "</td><td>" + leq[name][2] + "</td><td>" + leq[name][3] + "</td><td>" + name + "</td>";
                    text+="</tr></tbody></table>";
                    div.style.display = "block";
                    closs.style.display="block";
                    div.innerHTML = text;
                }
            }
        }

        window.addEventListener('contextmenu', function (ev) {
            if (swich == 1) {
                swich = 0;
            } else {
                swich = 1;
            }
            ev.preventDefault();
            var pickResult = scene.pick(ev.clientX, ev.clientY);
            var name = parseInt(pickResult.pickedMesh.name.substr(0, 1), 10);
            
            if (swich == 1) {
                while (name < sartulebi.length) {
                    var e = 0;
                    if (name < 4) {
                        var len1 = txtPlanes[name].length;
                        while (e < len1) {
                            txtPlanes[name][e].isVisible = false;
                            e += 1;
                        }
                    }
                    
                    var p = 0;
                    var len = sartulebi[name].length;
                    while (p < len) {
                        sartulebi[name][p].isVisible = false;
                        p += 1;
                    }
                    name += 1;
                    
                }
            } else {
                while (name < sartulebi.length) {
                    if (name < 4) {
                        var e = 0;
                        var len1 = txtPlanes[name].length;
                        while (e < len1) {
                            txtPlanes[name][e].isVisible = true;
                            e += 1;
                        }
                    }
                    var p = 0;
                    
                    var len = sartulebi[name].length;
                    while (p < len) {
                        sartulebi[name][p].isVisible = true;
                        p += 1;
                    }
                    name += 1;
                    
                }

            }
            return false;
        }, false);

        //---------------------------Scene Render-----------------
      

        function main_func() {

            setEnv(hh);
          
            setInterval(updatetime, 1000);
            
            
                 if (mm >= 45) {
                shesveneba(hh);
                
                if ((hh < 21) && (hh > 8)) {
                    document.getElementById("cap").style.display = "block";
                }
            } else {
                document.getElementById("cap").style.display = "none";
                console.log("ss");
                shesveneba(hh - 1);
            }
        }
        //====================Loading Screen==================

        engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener("resize", function () {

            engine.resize();

        });

        document.getElementById("main_window").onclick = function () {
            document.getElementById("renderCanvas").style.display = "block";
            document.getElementById("second").style.display = "none";
        }
        document.getElementById("second_window").onclick = function () {
            document.getElementById("renderCanvas").style.display = "none";
            document.getElementById("second").style.display = "block";
        }
if(window.XMLHttpRequest){
    var ajax= new XMLHttpRequest();
}else{
    var ajax= new ActiveXObject("Microsoft.XMLHTTP");
}

closs.onclick=function(){
        closs.style.display="none";
        div.style.display="none";
    }
function onkey1(){
    
   
    if(document.getElementById("jgufebi").checked){
    var id="jgufebi";
      
    }
    if(document.getElementById("leqtorebi").checked){
        var id="leqtorebi";
        
      
    }
    if(document.getElementById("auditoriebi").checked){
        var id="auditoriebi";
       
     
    }
     var cxrili=input.value;
    if((cxrili.length>3)&&(cxrili.indexOf("'")==-1)&&(cxrili.indexOf('"')==-1)&&(cxrili.indexOf('  ')==-1)){
  
        ajax.open("GET","request.php?id="+id+"&cxrili="+cxrili+"");
        ajax.onreadystatechange=function(){
            if((ajax.readyState===4)&&(ajax.status===200)){
                if(ajax.responseText.length>1){
                    div.style.display="block";
                    closs.style.display="block";
                    div.innerHTML=ajax.responseText;
                    document.getElementById("text").innerHTML="";
                }else{
                    document.getElementById("text").innerHTML="ჩანაწერი არ მოიძებნა";
                }
            }
        }
        ajax.send();
    
}
    
}

    