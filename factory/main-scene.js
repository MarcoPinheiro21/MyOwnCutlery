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

// Ambient ligth
var light = new THREE.AmbientLight(0xC1C1C1); // soft white light

// Directional ligth
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);

// Axis Helper
var axesHelper = new THREE.AxesHelper(10);

var roboticArms = [];

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
/** 
 * **************************************************************************************************
 * FUNCTIONS
 * **************************************************************************************************
 *  */

function buildScene() {
    buildWidgets();
    buildFloor();
    buildTables();
    buildPlaceholder();
}

function buildFloor() {
    scene.add(floor());
}

function buildTables() {
    TABLES_POSITIONS.forEach(e => moveTable(e));
}

function moveTable(e) {
    let t = table();
    t.scale.set(TABLE_SCALE, TABLE_SCALE, TABLE_SCALE);
    t.translateX(e.x);
    t.translateY(e.y);
    t.translateZ(e.z);

    scene.add(t);
}

function buildMachine(position) {
    var loader = new THREE.ColladaLoader();

    loader.load('http://localhost:5000/models/model.dae', collada => {
        collada.scene.scale.set(0.05, 0.05, 0.05);
        collada.scene.translateX(position.x);
        collada.scene.translateY(position.y);
        collada.scene.rotateZ(-Math.PI / 2.0);

        scene.add(collada.scene);
    });
}

function buildPlaceholder() {
    for (i = 0; i < PLACEHOLDERS_POSITIONS.length; i++) {
        placeholder(`M${i + 1}`, PLACEHOLDERS_POSITIONS[i]);
    }
}

function buildWidgets() {
    let selectedMachine = {
        type: null
    };

    let controllerMachines = gui.addFolder(`Machines Specs`)
    for (i = 0; i < MACHINE_POSITIONS.length; i++) {
        let idx = i + 1;
        controllerMachines.addFolder(`Machine ${i + 1}`)
            .add(selectedMachine, 'type', MACHINE_TYPES)
            .onChange((selectedValue) => replaceMachinePlaceholder(selectedMachine, idx));
    }
}

function replaceMachinePlaceholder(machine, i) {
    removePlaceholder(`M${i}`);
    switch (machine.type) {
        case "Custom Robotic Arm":
            let roboticArm = new RoboticArm();
            roboticArms.push(roboticArm);
            scene.add( roboticArm.buildRobotArm(PLACEHOLDERS_POSITIONS[i - 1]) );
            break;
        case "Robotic Arm":
            buildMachine(MACHINE_POSITIONS[i - 1]);
            break;
    }
}

function removePlaceholder(name) {
    let placeholder = scene.getObjectByName(name);
    scene.remove(placeholder);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    roboticArms.forEach(e => {
        e.rotateBase();
        e.rotateArm();
    });
}