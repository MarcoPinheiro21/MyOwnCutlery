/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const CONFIG = defaultConfig;
const MACHINE_POSITIONS = CONFIG.machines.positions;
const MACHINE_TYPES = CONFIG.machines.types;
const MACHINES_TOTAL = CONFIG.machines.total;
const API_URL = configurationsApi.visualizationApi.url;
const PRESS_MACHINE_POSITIONS = CONFIG.machines.pressPositions;

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

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add element to the scene
scene.add(axesHelper);

scene.add(light);
scene.add(directionalLight);

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
    var productionLines = getProductionLines();
    //buildWidgets();

    buildFloor();
    buildTables(productionLines);
    buildMachines(productionLines);

    buildFork(linesX, lineAY, linesZ);
    buildSpoon(linesX, lineBY, linesZ);
}

function buildFloor() {
    let floor = new Floor();
    scene.add( floor.buildFloor() );
}

function buildTables(productionLines) {
    nProductionLines=0;
    var tables = [];
    var table;
    var i;
    productionLines.forEach(function (e) {
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

function buildMachine(machine,count,productionLineNumber) {
    var productionLinePlacement= -30;
    productionLinePlacement = productionLinePlacement + (20*(count-1));

    let newSceneObject;
    switch (MACHINE_TYPES[machine.machineTypeId]) {
        case "Custom Robotic Arm":
            let roboticArm = new RoboticArm(machine.description);
            roboticArms.push(roboticArm);
            if(productionLineNumber%2==0){
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement-5, y: 0, z: (15*(productionLineNumber/2))+10});
            }else{
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement-5, y: 0, z: (-15*productionLineNumber)+10});
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

function buildMachines(productionLines) {
    var plCount=0;
    productionLines.forEach(function (pl) {
        plCount++;
        var count = 1;
        pl.machinesListDtos.forEach(function (machine) {
            buildMachine(machine,count,plCount);
            count++;
        });
    });
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