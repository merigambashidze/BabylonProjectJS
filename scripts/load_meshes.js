      //----------------------Loading Meshes----------------------------

//container for meshes of every floor
var sartulebi = [1, 1, 1, 1, 1];
        //material for active auditories
        var light_blue_material;
        //material for inactive auditories
        var dark_blue_material;
        //count of imported meshes
        var imported_meshes = 0;



        BABYLON.SceneLoader.ImportMesh("", "model/", "material_cubes.babylon", scene, function (newMeshes) {
            //importing two cubes  to get materials 
            light_blue_material = newMeshes[0].material;
            newMeshes[0].dispose();
            dark_blue_material = newMeshes[1].material;
            newMeshes[1].dispose();
            ifloaded();
        });

        BABYLON.SceneLoader.ImportMesh("", "model/", "first.babylon", scene, function (newMeshes) {

            makeTxtPlanes(newMeshes, 0);
            sartulebi.splice(0, 1, newMeshes);
            
            ifloaded();


        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "second.babylon", scene, function (newMeshes) {

            makeTxtPlanes(newMeshes, 1);
            sartulebi.splice(1, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "third.babylon", scene, function (newMeshes) {

            makeTxtPlanes(newMeshes, 2);
            sartulebi.splice(2, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "fourth.babylon", scene, function (newMeshes) {

            makeTxtPlanes(newMeshes, 3);
            sartulebi.splice(3, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "walls_roof.babylon", scene, function (newMeshes) {

            sartulebi.splice(4, 1, newMeshes);
            
            ifloaded();
        });
        BABYLON.SceneLoader.ImportMesh("", "model/", "exterior.babylon", scene, function (newMeshes) {
            ifloaded();
        });

