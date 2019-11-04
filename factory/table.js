/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const TABLE_LEG_WIDTH = 2;
const TABLE_LEG_HEIGHT = 10;
const TABLE_LEG_DEPTH = 2;

const TABLE_TOP_WIDTH = 40;
const TABLE_TOP_HEIGHT = 2;
const TABLE_TOP_DEPTH = 2;

const DISTANCE_WIDTH_BETWEEN_LEGS = 20;
const DISTANCE_HEIGHT_BETWEEN_LEGS = 10;

const TABLE_COLOR = 0xbebebe;

const N_LEGS = 4;
const N_BARS = 2;
const N_CYLINDERS = 21;

/** 
 * **************************************************************************************************
 * FUNCTIONS
 * **************************************************************************************************
 *  */

function table() {

    let legs = [];
    // Get 4 legs
    for(i = 0; i < N_LEGS; i++) {
        let mesh = tableLeg();
        repositionLeg(mesh.geometry, i);
        legs.push(mesh);
    }

    // Table bars
    let bars = [];
    for(i = 0; i < N_BARS; i++) {
        let mesh = tableTopBar();
        repositionBar(mesh.geometry, i);
        bars.push(mesh);
    }

    // Cylinders
    let cylinders = [];
    for(i = 0; i < N_CYLINDERS; i++) {
        let mesh = cylinder();
        repositionCylinder(mesh.geometry, i);
        cylinders.push(mesh);
    }

    // Merge geometries
    let tableGeometry = new THREE.Geometry();
    legs.forEach(e => {
        tableGeometry.merge(e.geometry);
    });

    bars.forEach(e => {
        tableGeometry.merge(e.geometry);
    });

    let tableMaterial = new THREE.MeshStandardMaterial( {
        color: 0x777777,
        flatShading: true,
        metalness: 0.5,
        roughness: 0.8,
        refractionRatio: 0.25
    } );
    let tableStructure = new THREE.Mesh( tableGeometry, tableMaterial);

    let treadmillGeometry = new THREE.Geometry();
    cylinders.forEach(e => {
        treadmillGeometry.merge(e.geometry);
    });

    let treadmillMaterial = new THREE.MeshStandardMaterial( {
        color: 0x0b2b26,
        flatShading: true,
        metalness: 0.5,
        roughness: 0.8,
        refractionRatio: 0.25

    } );
    let treadmill = new THREE.Mesh( treadmillGeometry, treadmillMaterial);

    let group = new THREE.Group();
    group.add(tableStructure);
    group.add(treadmill);
    return group;
}

// Legs
function tableLeg() {
    var geometry = new THREE.BoxGeometry( TABLE_LEG_WIDTH, TABLE_LEG_HEIGHT, TABLE_LEG_DEPTH );
    return new THREE.Mesh( geometry );
}

function repositionLeg(geometry, i) {
    let positions = [
        { x: DISTANCE_WIDTH_BETWEEN_LEGS/2.0 , y: TABLE_LEG_HEIGHT/2.0 , z: -DISTANCE_HEIGHT_BETWEEN_LEGS/2.0},
        { x: DISTANCE_WIDTH_BETWEEN_LEGS/2.0 , y: TABLE_LEG_HEIGHT/2.0 , z: DISTANCE_HEIGHT_BETWEEN_LEGS/2.0},
        { x: -DISTANCE_WIDTH_BETWEEN_LEGS/2.0 , y: TABLE_LEG_HEIGHT/2.0 , z: DISTANCE_HEIGHT_BETWEEN_LEGS/2.0},
        { x: -DISTANCE_WIDTH_BETWEEN_LEGS/2.0 , y: TABLE_LEG_HEIGHT/2.0 , z: -DISTANCE_HEIGHT_BETWEEN_LEGS/2.0}
    ];

    geometry.translate(positions[i].x, positions[i].y, positions[i].z);
}

// Top
function tableTopBar() {
    var geometry = new THREE.BoxGeometry( TABLE_TOP_WIDTH, TABLE_TOP_HEIGHT, TABLE_TOP_DEPTH );
    return new THREE.Mesh( geometry );
}

function repositionBar(geometry, i) {
    let positions = [
        { x: 0 , y: TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT/2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS/2.0 },
        { x: 0 , y: TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT/2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS/2.0 },
    ];

    geometry.translate(positions[i].x, positions[i].y, positions[i].z);
}

// Cylinders
function cylinder() {
    var geometry = new THREE.CylinderGeometry( TABLE_TOP_HEIGHT/2.0, TABLE_TOP_HEIGHT/2.0, DISTANCE_HEIGHT_BETWEEN_LEGS, 32 );
    return new THREE.Mesh( geometry );
}

function repositionCylinder(geometry, i) {
    geometry.rotateX(Math.PI / 2.0);
    geometry.translate(TABLE_TOP_WIDTH/2.0-(TABLE_TOP_HEIGHT/2.0+1)*i, TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT/2.0, 0);
}