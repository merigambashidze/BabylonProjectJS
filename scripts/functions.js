//Adjust camera before rendering     
var double_time;
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

     //-------------------- Create Text Planes ---------------------


        //text planes for every floor
        var allTxtPlanes = [1, 1, 1, 1];

        function makeTxtPlanes(newMeshes, sartuli) {
            //one text plane
            var txtPlane = "";
            var i = 0;
            //text planes for one floor
            var txtPlanes = [];
            while (i < newMeshes.length) {
                newMeshes[i].isPickable = true;
                if (newMeshes[i].name.length == 3) {
                    txtPlane = makeTextPlane(newMeshes[i].name, "yellow", 1);
                    txtPlane.position = newMeshes[i].position;
                    txtPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
                    txtPlanes.push(txtPlane);

                }
                i += 1;
            }
            //moving one floor created text planes in all floor text planes array
            allTxtPlanes.splice(sartuli, 1, txtPlanes);
        }


        var makeTextPlane = function (text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            var txtPlane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            txtPlane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            txtPlane.material.backFaceCulling = false;
            txtPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            txtPlane.material.diffuseTexture = dynamicTexture;
            return txtPlane;
        };

//-----------------fill-in data functions----------------
  var leqciebi={};  

function display_schedule(result) {
            var temp_leqciebi = {};
            change_env(dark_blue_material,false);
          
            var separate_lectures = result.split(";");
    
            separate_lectures.splice((separate_lectures.length - 1), 1);
    
            var m = 0;
            while (m < separate_lectures.length) {
                
                var lecture_info = separate_lectures[m].split("^");
              
                temp_leqciebi[lecture_info[0]] = lecture_info;
                var mesh_name_to_light = scene.getMeshByName(lecture_info[0]);
                    mesh_name_to_light.material = light_blue_material;
               
                m += 1;
            }
            leqciebi = temp_leqciebi;
    
        }


 function shevseba(current_mm) {    
    
     var temp_current_hh=current_hh;
     var temp_sending_hh;
     if (current_mm >= 45) {
         temp_current_hh++;
         if((temp_current_hh < 21) && (temp_current_hh > 8)){
             document.getElementById("cap").style.display="block";
         }
     }
     if ((temp_current_hh < 21) && (temp_current_hh > 8)) {
         temp_sending_hh=temp_current_hh-9;
        
         var request="request.php?dge=" + current_day + "&saati=" + temp_sending_hh + "";
         
         $.ajax({
             url: request
             , success: function (result) {
                 if (result) {
                     
                     display_schedule(result);
                    
                 }
                 else {
                     leqciebi = {};
                 }
             }
         });
     }
     else {
         leqciebi = {};
     }
 }

//--------------initiating logic,after meshes have been loaded----

        //function checks if all meshes have been imported to avoid asynchronous loading
        function ifloaded() {
            imported_meshes += 1;
            if (imported_meshes == 7) {
                main_func();
            }
        }


//-------------- Get data from scene (auditories click event)-----
      function pick_auditories(evt) {
            var pick_result = scene.pick(evt.clientX, evt.clientY);
          
              
            var result_name = pick_result.pickedMesh.name;
          
            if (leqciebi.hasOwnProperty(result_name)) {
                
                if (result_name.length == 3) {



                    var current_lecture = "<table><tr id='header'><td>ლექცია</td><td>ლექტორი</td><td>ჯგუფი</td><td>აუდიტორია</td><td id='close' onclick='close_table()'><i class='fa fa-times' aria-hidden='true'></i></td></tr><tr>";

                    current_lecture += "<td>" + leqciebi[result_name][1] + "</td><td>" + leqciebi[result_name][2] + "</td><td>" + leqciebi[result_name][3] + "</td><td>" + result_name + "</td>";
                    current_lecture += "</tr></table>";
                    var content=document.getElementById("content");
                    content.innerHTML = current_lecture;
                    content.style.display="block";
                }
            }
        }

//-------- Start rendering the scene and setting environment--------
   function main_func() {

            setEnv();
            setInterval(update_time, 1000);
        
            shevseba(current_mm);
        }

    


//------------set or change encironment-------------
function setEnv() {
           
    document.getElementById("cap").style.display="none";
    
            if ((current_hh >= 7) && (current_hh < 18)) {
               
change_env(dark_blue_material,true,1,5,skyboxMorning,false);
              
            }
            if ((current_hh >= 18) && (current_hh < 22)) {
            
change_env(dark_blue_material,true,2,3,skyboxSunset,false);
             
            }
            if ((current_hh >= 22) || (current_hh < 7)) {
                    change_env(light_blue_material,true,3,0.003,skyboxNight,true);

            }
        } //change environment , sky , lightning


function change_env(auditories_material,change_environment,sky_value,main_light_intensity,skybox_material,night_lights_boolean) {
            //lights up auditories at night
            //changes light intensivity
            //changes skybox material
            //switches night lights
        
    if(change_environment){
            sky=sky_value;
            skybox.material=skybox_material;
        
            main_light.intensity=main_light_intensity;
            night_light_blue.setEnabled(night_lights_boolean); // always same
            night_light_white.setEnabled(night_lights_boolean); //always same
        
    }
    
            var sartuli = 0;
            while (sartuli < 4) {
                var auditoria = 0;
                while (auditoria < sartulebi[sartuli].length) {
                    if (sartulebi[sartuli][auditoria].name.length == 3) {
                        sartulebi[sartuli][auditoria].material = auditories_material;
                    }
                    auditoria += 1;
                }
                sartuli += 1;
            }
        }

    //-------------------- Timing Functions----------

        function daychange() {
            
            document.getElementById("dge").innerHTML = '<div id="dge_span"style="ackground-color: rgba(22, 31, 39, 0.6);"><select id="day_select"onchange="daychanged();"><option value="0">ორშაბათი</option><option value="1">სამშაბათი</option><option value="2">ოთხშაბათი</option><option value="3">ხუთშაბათი</option><option value="4">პარასკევი</option><option value="5">შაბათი</option></select></div>';

         
        }

        function daychanged() {
            
            document.getElementById("dge").innerHTML ='<div id="dge_span" onclick="daychange();" style="ackground-color: rgba(22, 31, 39, 0.6);">'+$("#day_select option:selected").text()+'</div>'; 
            current_day = $("#day_select option:selected").val();
            shevseba(current_mm);
        }
        //--------------------------Get initial time-------------------------


        function update_changed_time() {
            current_ss++;
            
            if (current_ss < 10) {
                current_ss = '0' + current_ss;
            }
            if (current_ss == 60) {
                current_ss = '00';
                current_mm++;
                if (double_timing) {
                    if(current_mm==45){
                      
                    shevseba(current_mm);
                    }
                }

                if (current_mm < 10) {
                    current_mm = '0' + current_mm;
                }
                if (current_mm == 60) {
                    current_mm = '00';
                    current_hh++;
                    if (double_timing) {
                        setEnv();
                    }

                    if (current_hh < 10) {
                        current_hh = '0' + current_hh;
                    }
                    if (current_hh == 24) {
                        current_hh = '00';
                    }

                    $("#changed_hours").html(current_hh);
                }
                $("#changed_minutes").html(current_mm);
            }
            $("#changed_seconds").html(current_ss);
        }

        function update_time() {
            ss++;
            if (ss < 10) {
                ss = '0' + ss;
            }
            if (ss == 60) {
                ss = '00';
                mm++;
                
                if (!double_timing) {
                    
                   if(mm==45){
                       
                   
                    shevseba(mm);
                    }
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }
                if (mm == 60) {
                    mm = '00';
                    hh++;
                    if (!double_timing) {
                        setEnv(hh);
                        
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

        function change_time() {

            document.getElementById("tavdapirveli_dro").style.display = "none";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "inline";
        }


        function save_time_change() {

            current_hh = parseInt(document.getElementById("input_hours").value, 10);
            current_mm = parseInt(document.getElementById("input_minutes").value, 10);
            current_ss = parseInt(document.getElementById("input_seconds").value, 10);
            
            if ((current_hh >= 0) && (current_hh <= 23) && (current_mm >= 0) && (current_mm <= 59) && (current_ss >= 0) && (current_ss <= 59)) {
                $("#changed_hours").html(current_hh);
                $("#changed_seconds").html(current_ss);
                $("#changed_minutes").html(current_mm);
                document.getElementById("tavdapirveli_dro").style.display = "none";
                document.getElementById("shecvlili_dro").style.display = "inline";
                document.getElementById("shesacvleli_paneli").style.display = "none";
                
                double_time = setInterval(update_changed_time, 1000);
                
                double_timing = true;

                setEnv();

                shevseba(current_mm);
                
                } else {
                discard_time_change();
            }
        }

        function discard_time_change() {

            document.getElementById("tavdapirveli_dro").style.display = "inline";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "none";

        }

        function reset_time() {
            clearInterval(double_time);

            document.getElementById("tavdapirveli_dro").style.display = "inline";
            document.getElementById("shecvlili_dro").style.display = "none";
            document.getElementById("shesacvleli_paneli").style.display = "none";
            
            double_timing = false;
            current_hh=hh;
            current_mm=mm;
            
            setEnv();

            shevseba(current_mm);
        }