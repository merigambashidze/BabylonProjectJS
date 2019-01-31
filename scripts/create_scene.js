
//-------------- Create AJAX object-------------
if (window.XMLHttpRequest) {
    var ajax = new XMLHttpRequest();
} else {
    var ajax = new ActiveXObject("Microsoft.XMLHTTP");
}


//---------------- Pick Auditories-------------
$("canvas").hover(function () {
    window.onclick = pick_auditories;
  

}, function () {
    window.onclick = null;

});

//-------------------Scene----------------------


        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        //------------- Camera----------
        var camera = new BABYLON.ArcRotateCamera("Camera", 20, 30, 60, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(15, 0, 20));
        scene.activeCamera.attachControl(canvas, false);


 

        scene.registerBeforeRender(beforeRenderFunction);

  engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener("resize", function () {

            engine.resize();

        });

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


   
        //--------------------- Floor hide implementation ---------------
var displayed=false;
        window.addEventListener('contextmenu', function (ev) {
            if (displayed) {
                displayed = false;
            } else {
                displayed = true;
            }
            ev.preventDefault();
            var picked_result = scene.pick(ev.clientX, ev.clientY);
            var picked_result_name = parseInt(picked_result.pickedMesh.name.substr(0, 1), 10);

            if (displayed) {
                while (picked_result_name < sartulebi.length) {
                    var e = 0;
                    if (picked_result_name < 4) {
                        var all_text_planes_on_floors = allTxtPlanes[picked_result_name].length;
                        while (e < all_text_planes_on_floors) {
                            allTxtPlanes[picked_result_name][e].isVisible = false;
                            e += 1;
                        }
                    }

                    var k = 0;
                    var all_auditories_on_floor = sartulebi[picked_result_name].length;
                    while (k < all_auditories_on_floor) {
                        sartulebi[picked_result_name][p].isVisible = false;
                        k += 1;
                    }
                    picked_result_name += 1;

                }
            } else {
                while (picked_result_name < sartulebi.length) {
                    if (picked_result_name < 4) {
                        var e = 0;
                        var all_text_planes_on_floors = allTxtPlanes[picked_result_name].length;
                        while (e < all_text_planes_on_floors) {
                            allTxtPlanes[picked_result_name][e].isVisible = true;
                            e += 1;
                        }
                    }
                     var k = 0;
                    var all_auditories_on_floor = sartulebi[picked_result_name].length;
                    while (k < all_auditories_on_floor) {
                        sartulebi[picked_result_name][p].isVisible = true;
                        k += 1;
                    }
                    picked_result_name += 1;

                }

            }
            return false;
        }, false);

function close_table(){
document.getElementById("content").innerHTML="";
document.getElementById("content").style.display="none";
}