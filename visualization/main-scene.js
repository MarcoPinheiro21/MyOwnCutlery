/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const CONFIG = defaultConfig;
const MODELS = CONFIG.machines.types;
const API_URL = configurationsApi.visualizationApi.url;

const LINE = CONFIG.lines;

/** 
 * **************************************************************************************************
 * MAIN CONTROlS AND CALLS
 * **************************************************************************************************
 **/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var gui = new dat.GUI();

var groupFork = new THREE.Group();
var groupSpoon = new THREE.Group();

var linesX = LINE.initialX;
var lineAY = LINE.lineAY;
var lineBY = LINE.lineBY;
var linesZ = LINE.lineZ;

var nProductionLines;


// Ambient ligth
var light = new THREE.AmbientLight(0xC1C1C1); // soft white light

// Directional ligth
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);

// Axis Helper
var axesHelper = new THREE.AxesHelper(10);

var roboticArms = [];
var pressMachines = [];
var productionLines;
var machineTypes;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add element to the scene
scene.add(axesHelper);


this.productionLines = getProductionLines();
this.machineTypes = getMachineTypes();
buildWidgets();
buildScene();

//controls.update() must be called after any manual changes to the camera's transform
camera.position.z = 50;
camera.position.y = 20;
controls.update();

animate();

//Timeouts
timeoutLineA();
timeoutLineB();

/** 
 * **************************************************************************************************
 * FUNCTIONS
 * **************************************************************************************************
 *  */

function buildScene() {
    buildFloor();
    buildTables();
    buildMachines();

    scene.add(light);
    scene.add(directionalLight);

    buildFork(linesX, lineAY, linesZ);
    buildSpoon(linesX, lineBY, linesZ);
}

function buildFloor() {
    let floor = new Floor();
    scene.add( floor.buildFloor() );
}

function buildTables() {
    nProductionLines=0;
    var tables = [];
    var table;
    var i;
    this.productionLines.forEach(function (e) {
        tables[nProductionLines]=new Table(e.productionLineName);
        nProductionLines++;
    });
    for(i=1;i<=nProductionLines;i++){
        if(i%2==0){
            table = tables[i-1].buildProductionLine(0.5, { x: 30, y: 0, z: 15*(i/2) });
            scene.add(table);
        }else{
            table = tables[i-1].buildProductionLine(0.5, { x: 30, y: 0, z: -15*i });
            scene.add(table);
        }
        
    }

        
}

function buildFork(x, y, z) {
    var loader = new THREE.ColladaLoader();
    loader.load(API_URL + 'models/fork.dae', collada => {
        collada.scene.scale.set(0.50, 0.8, 1);
        collada.scene.translateX(x);
        collada.scene.translateY(y);
        collada.scene.translateZ(z);
        collada.scene.rotateZ(Math.PI);

        groupFork.add(collada.scene)
    });
    scene.add(groupFork);
}

function buildSpoon(x, y, z) {
    var loader = new THREE.ColladaLoader();
    loader.load(API_URL + 'models/spoon.dae', collada => {
        collada.scene.scale.set(0.50, 0.8, 1);
        collada.scene.translateX(x);
        collada.scene.translateY(y);
        collada.scene.translateZ(z);
        collada.scene.rotateZ(Math.PI);

        groupSpoon.add(collada.scene)
    });
    scene.add(groupSpoon);
}

function buildMachine(machine,productionLineNumber,model) {
    var productionLinePlacement= -30;
    productionLinePlacement = productionLinePlacement + (10*(machine.productionLinePosition-1));

    let newSceneObject;
    switch (model) {
        case "Robotic Arm":
            let roboticArm = new RoboticArm(machine.description);
            roboticArms.push(roboticArm);
            if(productionLineNumber%2==0){
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement-8, y: 0, z: (15*(productionLineNumber/2))+10});
            }else{
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement-8, y: 0, z: (-15*productionLineNumber)+10});
            }
            break;
        case "Hydraulic Press":
            let pressMachine = new PressMachine(machine.description);
            pressMachines.push(pressMachine);
            if(productionLineNumber%2==0){
                newSceneObject = pressMachine.buildHydraulicPress({ x: productionLinePlacement, y: 5, z: (15*(productionLineNumber/2))-6});
            }else{
                newSceneObject = pressMachine.buildHydraulicPress({ x: productionLinePlacement, y: 5, z: (-15*productionLineNumber)-6});
            }
            break;
    }
    scene.add(newSceneObject);
}

function buildMachines() {
    var plCount=0;
    this.productionLines.forEach(function (pl) {
        plCount++;
        var count = 1;
        pl.machinesListDtos.forEach(function (machine) {

            if(machine.productionLinePosition ==0){
                machine.productionLinePosition=count;
                if(configurationsApi.factoryApi.isEnable){
                    updateMachinePosition(machine);
                }
            }

            var model = getModelOfMachineType(machine.machineTypeId);
            buildMachine(machine,plCount,model);
            count++;
        });
    });
}

function getModelOfMachineType(machineTypeId) {
    var result;
    this.machineTypes.forEach(function (type) {
        if(type.id === machineTypeId){
            result = type.visualizationModel;
        }
    });
    return result;
}

function timeoutLineA() {
    setTimeout(function () {
        groupFork.position.x--;

        if (groupFork.position.x == LINE.finalX) {
            groupFork.position.x = 0;
        }

        timeoutLineA();
    }, 300);
}

function timeoutLineB() {
    setTimeout(function () {
        groupSpoon.position.x--;

        if (groupSpoon.position.x == LINE.finalX) {
            groupSpoon.position.x = 0;
        }

        timeoutLineB();
    }, 300);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    pressMachines.forEach(e => {
        e.timeoutPressArm();
    });
    roboticArms.forEach(e => {
        //e.rotateBase();
        e.rotateArm();
    });
}
function buildWidgets() {
    let selectedMachine = {
        type: null
    };
    let selectedPosition = {
        Position: ""
    };

    let controllerMachineTypes = gui.addFolder(`Change Model of Machine Type`)
    for (i = 0; i < this.machineTypes.length; i++) {
        let idx = i;
        
        controllerMachineTypes.addFolder(this.machineTypes[i].desc)
            .add(selectedMachine, 'type', MODELS)
            .onChange((selectedValue) => 
                updateModel(idx,selectedValue)
                );
        
        
    }
    let controllerMachines = gui.addFolder(`Change Machine Position`)
    for (k = 0; k < this.productionLines.length; k++) {
        let idk = k;
        for (j = 0; j < this.productionLines[k].machinesListDtos.length; j++) {
            let idj = j;
            var button = { 
                add:function(){
                    swapMachine(productionLines[idk].machinesListDtos[idj],parseInt(selectedPosition.Position))
                    productionLines[idk].machinesListDtos[idj].productionLinePosition=parseInt(selectedPosition.Position)
                    if(configurationsApi.factoryApi.isEnable){
                        updateMachinePosition(productionLines[idk].machinesListDtos[idj])
                    }else{
                        updateVisualizationModelListener()
                    }
                }
            };
            var line=controllerMachines.addFolder(this.productionLines[k].machinesListDtos[j].description);
                line.add(selectedPosition, 'Position');
                line.add(button,'add').name('Save Change');
        }   
    }
}

function swapMachine(machine,position) {
    this.productionLines.forEach(function (pl) {
        if(pl.productionLineId == machine.productionLineId){
            pl.machinesListDtos.forEach(function (m) {
                if(m.productionLinePosition==position){
                    m.productionLinePosition=machine.productionLinePosition;
                }
            });
        }
    });
}

function updateModel(idx,selectedValue) {
    this.machineTypes[idx].visualizationModel=selectedValue;
    if(configurationsApi.factoryApi.isEnable){
        updateVisualizationModel(this.machineTypes[idx]);  
    }else{
        updateVisualizationModelListener();
    }
}

function updateVisualizationModelListener(){
    scene=new THREE.Scene();
    gui = new dat.GUI();
    buildScene();
}






