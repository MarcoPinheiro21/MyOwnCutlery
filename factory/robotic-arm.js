// const THREE = require('./lib/three.js');

//Robot Arm Offset Values
const OFFSET_X=7;
const OFFSET_Z=-1;
const OFFSET_ANGLE=-toRad(90);

//Base Cylinder
const BASE_HEIGHT =1;
const BASE_RADIUS =2.5;
const BASE_TEXTURE = './textures/yellowStripes.png';

//Segment1
const SEGMENT1_WIDTH = 1;
const SEGMENT1_HEIGHT = 8;
const SEGMENT1_DEPTH = 1;
const SEGMENT1_ANGLE = toRad(20);

//Segment2
const SEGMENT2_WIDTH = 1;
const SEGMENT2_HEIGHT = 5;
const SEGMENT2_DEPTH = 1;
const SEGMENT2_ANGLE = toRad(40);

//Wrist
const WRIST_WIDTH = 0.5;
const WRIST_HEIGHT = 1.0;
const WRIST_DEPTH = 1;
const WRIST_ANGLE = toRad(22);

//Claw
const CLAW_BASE_WIDTH = 1;
const CLAW_BASE_HEIGHT = 0.1;
const CLAW_BASE_DEPTH = 1.2;
const CLAW_WIDTH = 0.1;
const CLAW_LENGTH = 0.5;
const CLAW_DISTANCE = 0.4;



//Joint Sphere Material
let jointSphereMaterial = new THREE.MeshStandardMaterial( {
    color: 0x777777,
    flatShading: true,
    metalness: 0.5,
    roughness: 0.8,
    refractionRatio: 0.25
} );

//Arm Material
let armMaterial = new THREE.MeshStandardMaterial( {
    color: 0xfeff08,
    flatShading: true,
    metalness: 0.5,
    roughness: 0.8,
    refractionRatio: 0.25
} );

function buildRobotArm(pos) {

    var sphereGeometry = new THREE.SphereGeometry(1,16,16);
    var group = new THREE.Group();

    //Base
    var cilynderGeometry = new THREE.CylinderGeometry(BASE_RADIUS,BASE_RADIUS,BASE_HEIGHT, 32);
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var texture = new THREE.TextureLoader().load( BASE_TEXTURE );
    var mat = new THREE.MeshBasicMaterial( { map: texture } );
    var cylinder = new THREE.Mesh(cilynderGeometry, mat);
    cilynderGeometry.translate(0,BASE_HEIGHT/2,0);

    //Joint1
    var joint1 = new THREE.Mesh(sphereGeometry, jointSphereMaterial);
    joint1.translateY(BASE_HEIGHT);
    joint1.setRotationFromAxisAngle(new THREE.Vector3(0,0,1), SEGMENT1_ANGLE);
    cylinder.add(joint1);
    
    //Segment 1
    var boxGeometry = new THREE.BoxGeometry(SEGMENT1_WIDTH,SEGMENT1_HEIGHT,SEGMENT1_DEPTH);
    var segment1 = new THREE.Mesh(boxGeometry, armMaterial);
    segment1.translateY(SEGMENT1_HEIGHT/2);
    joint1.add(segment1);

    //Joint2
    var joint2 = new THREE.Mesh(sphereGeometry, jointSphereMaterial);
    joint2.translateY(SEGMENT1_HEIGHT/2);
    joint2.setRotationFromAxisAngle(new THREE.Vector3(0,0,1), SEGMENT2_ANGLE);
    segment1.add(joint2);

    //Segment 2
    var boxGeometry2 = new THREE.BoxGeometry(SEGMENT2_WIDTH,SEGMENT2_HEIGHT,SEGMENT2_DEPTH);
    var segment2 = new THREE.Mesh(boxGeometry2, armMaterial);
    segment2.translateY(SEGMENT2_HEIGHT/2);
    joint2.add(segment2);

    //Joint3
    var cyl1 = new THREE.CylinderGeometry(0.5,0.5,1.01, 16);
    var joint3 = new THREE.Mesh(cyl1, jointSphereMaterial);
    cyl1.rotateX(toRad(90));
    joint3.translateY(SEGMENT2_HEIGHT/2);
    joint3.setRotationFromAxisAngle(new THREE.Vector3(0,0,1), WRIST_ANGLE);
    segment2.add(joint3);

    //Wrist
    var boxGeometry3 = new THREE.BoxGeometry(WRIST_WIDTH,WRIST_HEIGHT,WRIST_DEPTH);
    var wrist = new THREE.Mesh(boxGeometry3, armMaterial);
    wrist.translateY(WRIST_HEIGHT/2);
    joint3.add(wrist);

    //Joint4
    var boxGeometry4 = new THREE.BoxGeometry(CLAW_BASE_WIDTH,CLAW_BASE_HEIGHT,CLAW_BASE_DEPTH);
    var joint4 = new THREE.Mesh(boxGeometry4, armMaterial);
    joint4.translateY(WRIST_HEIGHT/2+CLAW_BASE_HEIGHT/2);
    wrist.add(joint4);

    //Claws
    var cyl2 = new THREE.CylinderGeometry(CLAW_WIDTH,CLAW_WIDTH,CLAW_LENGTH, 16);
    var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    var claw1 = new THREE.Mesh(cyl2, material);
    var claw2 = new THREE.Mesh(cyl2, material);
    claw1.translateY(CLAW_LENGTH/2);
    claw2.translateY(CLAW_LENGTH/2);
    claw1.translateZ(CLAW_DISTANCE);
    claw2.translateZ(-CLAW_DISTANCE);
    joint4.add(claw1);
    joint4.add(claw2);

    group.add(cylinder);
    group.translateX(pos.x+OFFSET_X);
    group.translateY(pos.y);
    group.translateZ(pos.z+OFFSET_Z);
    group.rotateY(OFFSET_ANGLE);

    scene.add(group);
}

function toRad(degrees){
    var pi = Math.PI;
    return degrees * -(pi/180);
}
