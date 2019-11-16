/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const CONFIG = defaultConfig;
const TABLE_SCALE = CONFIG.tables.scale;
const TABLES_POSITIONS = CONFIG.tables.positions;
const PLACEHOLDERS_POSITIONS = CONFIG.placeholders.positions;
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

// GET method
var machines = getMachines();

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
    buildWidgets();

    buildFloor();
    buildTables();
    buildPlaceholders();

    buildFork(linesX, lineAY, linesZ);
    buildSpoon(linesX, lineBY, linesZ);
}

function buildFloor() {
    let floor = new Floor();
    scene.add( floor.buildFloor() );
}

function buildTables() {
    TABLES_POSITIONS.forEach(e => moveTable(e));
}

function moveTable(position) {
    let table = new Table();
    table = table.buildTable(TABLE_SCALE, position);

    scene.add(table);
}

function buildMachine(position) {
    var loader = new THREE.ColladaLoader();

    loader.load(API_URL + 'models/model.dae', collada => {
        collada.scene.scale.set(0.05, 0.05, 0.05);
        collada.scene.translateX(position.x);
        collada.scene.translateY(position.y);
        collada.scene.rotateZ(-Math.PI / 2.0);

        scene.add(collada.scene);
    });
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

function buildPlaceholders() {
    for (i = 0; i < this.machines.length; i++) {
        let obj = buildPlaceholder(this.machines[i].description, PLACEHOLDERS_POSITIONS[i]);
        scene.add( obj );
    }
}

function buildWidgets() {
    let selectedMachine = {
        type: null
    };

    let controllerMachines = gui.addFolder(`Machines Specs`)
    for (i = 0; i < this.machines.length; i++) {
        let idx = i + 1;
        controllerMachines.addFolder(this.machines[i].description)
            .add(selectedMachine, 'type', MACHINE_TYPES)
            .onChange((selectedValue) => replaceMachinePlaceholder(selectedMachine, idx));
    }
}

function replaceMachinePlaceholder(machine, i) {
    Util.removeFromScene(scene, this.machines[i - 1].description);
    let newSceneObject;
    switch (machine.type) {
        case "none":
            newSceneObject = buildPlaceholder(this.machines[i - 1].description, PLACEHOLDERS_POSITIONS[i-1]);
            break;
        case "Custom Robotic Arm":
            let roboticArm = new RoboticArm(this.machines[i - 1].description);
            roboticArms.push(roboticArm);

            newSceneObject = roboticArm.buildRobotArm(PLACEHOLDERS_POSITIONS[i - 1]);
            break;
        case "Hydraulic Press":
            let pressMachine = new PressMachine(this.machines[i - 1].description);
            pressMachines.push(pressMachine);

            newSceneObject = pressMachine.buildHydraulicPress(PRESS_MACHINE_POSITIONS[i - 1]);
            break;
    }
    scene.add(newSceneObject);
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
        e.rotateBase();
        e.rotateArm();
    });
}