'use strict';

//Robot Arm Offset Values
var OFFSET_X = 7;
var OFFSET_Z = -1;
var OFFSET_ANGLE = 90;

//Base Cylinder
var BASE_HEIGHT = 1;
var BASE_RADIUS = 2.5;
var BASE_TEXTURE = './textures/yellowStripes.png';

//Segment1
var SEGMENT1_WIDTH = 1;
var SEGMENT1_HEIGHT = 8;
var SEGMENT1_DEPTH = 1;
var SEGMENT1_ANGLE = Util.toRad(20);

//Segment2
var SEGMENT2_WIDTH = 1;
var SEGMENT2_HEIGHT = 5;
var SEGMENT2_DEPTH = 1;
var SEGMENT2_ANGLE = Util.toRad(40);

//Wrist
var WRIST_WIDTH = 0.5;
var WRIST_HEIGHT = 1.0;
var WRIST_DEPTH = 1;
var WRIST_ANGLE = Util.toRad(22);

//Claw
var CLAW_BASE_WIDTH = 1;
var CLAW_BASE_HEIGHT = 0.1;
var CLAW_BASE_DEPTH = 1.2;
var CLAW_WIDTH = 0.1;
var CLAW_LENGTH = 0.5;
var CLAW_DISTANCE = 0.4;

class RoboticArm {
    constructor(name) {
        this.group = new THREE.Group();
        this.group.name = name;
        
        //Joint Sphere Material
        this.jointSphereMaterial  = new THREE.MeshStandardMaterial({
            color: 0x777777,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });

        //Arm Material
        this.armMaterial  = new THREE.MeshStandardMaterial({
            color: 0xfeff08,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });
    }

    buildRobotArm(pos) {
        let sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

        //Base
        let cilynderGeometry = new THREE.CylinderGeometry(BASE_RADIUS, BASE_RADIUS, BASE_HEIGHT, 32);
        let texture = new THREE.TextureLoader().load(BASE_TEXTURE);
        let mat = new THREE.MeshBasicMaterial({ map: texture });
        let cylinder = new THREE.Mesh(cilynderGeometry, mat);
        cilynderGeometry.translate(0, BASE_HEIGHT / 2, 0);
        cylinder.userData.parentGroup = this.group.name;

        //Joint1
        let joint1 = new THREE.Mesh(sphereGeometry, this.jointSphereMaterial  );
        joint1.translateY(BASE_HEIGHT);
        joint1.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), SEGMENT1_ANGLE);
        joint1.userData.parentGroup = this.group.name;
        cylinder.add(joint1);

        //Segment 1
        let boxGeometry = new THREE.BoxGeometry(SEGMENT1_WIDTH, SEGMENT1_HEIGHT, SEGMENT1_DEPTH);
        let segment1 = new THREE.Mesh(boxGeometry, this.armMaterial );
        segment1.translateY(SEGMENT1_HEIGHT / 2);
        segment1.userData.parentGroup = this.group.name;
        joint1.add(segment1);

        //this._joint2
        this._joint2 = new THREE.Mesh(sphereGeometry, this.jointSphereMaterial );
        this._joint2.translateY(SEGMENT1_HEIGHT / 2);
        // this._joint2.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), SEGMENT2_ANGLE);
        this._joint2.userData.parentGroup = this.group.name;
        segment1.add(this._joint2);

        //Segment 2
        let boxGeometry2 = new THREE.BoxGeometry(SEGMENT2_WIDTH, SEGMENT2_HEIGHT, SEGMENT2_DEPTH);
        let segment2 = new THREE.Mesh(boxGeometry2, this.armMaterial );
        segment2.translateY(SEGMENT2_HEIGHT / 2);
        segment2.userData.parentGroup = this.group.name;
        this._joint2.add(segment2);

        //Joint3
        let cyl1 = new THREE.CylinderGeometry(0.5, 0.5, 1.01, 16);
        let joint3 = new THREE.Mesh(cyl1, this.jointSphereMaterial );
        cyl1.rotateX(Util.toRad(90));
        joint3.translateY(SEGMENT2_HEIGHT / 2);
        joint3.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), WRIST_ANGLE);
        joint3.userData.parentGroup = this.group.name;
        segment2.add(joint3);

        //Wrist
        let boxGeometry3 = new THREE.BoxGeometry(WRIST_WIDTH, WRIST_HEIGHT, WRIST_DEPTH);
        let wrist = new THREE.Mesh(boxGeometry3, this.armMaterial );
        wrist.translateY(WRIST_HEIGHT / 2);
        wrist.userData.parentGroup = this.group.name;
        joint3.add(wrist);

        //Joint4
        let boxGeometry4 = new THREE.BoxGeometry(CLAW_BASE_WIDTH, CLAW_BASE_HEIGHT, CLAW_BASE_DEPTH);
        let joint4 = new THREE.Mesh(boxGeometry4, this.armMaterial );
        joint4.translateY(WRIST_HEIGHT / 2 + CLAW_BASE_HEIGHT / 2);
        joint4.userData.parentGroup = this.group.name;
        wrist.add(joint4);

        //Claws
        let cyl2 = new THREE.CylinderGeometry(CLAW_WIDTH, CLAW_WIDTH, CLAW_LENGTH, 16);
        let material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        let claw1 = new THREE.Mesh(cyl2, material);
        this._claw2 = new THREE.Mesh(cyl2, material);
        claw1.translateY(CLAW_LENGTH / 2);
        this._claw2.translateY(CLAW_LENGTH / 2);
        claw1.translateZ(CLAW_DISTANCE);
        this._claw2.translateZ(-CLAW_DISTANCE);
        claw1.userData.parentGroup = this.group.name;
        this._claw2.userData.parentGroup = this.group.name;
        joint4.add(claw1);
        joint4.add(this._claw2);

        this.group.add(cylinder);
        this.group.translateX(pos.x + OFFSET_X);
        this.group.translateY(pos.y);
        this.group.translateZ(pos.z + OFFSET_Z);
        this.group.rotateY(-Util.toRad(OFFSET_ANGLE));

        this.group.userData.tooltipText = 'text';
        return this.group;
    }

    rotateBase() {
        if(this.group.rotation.y <= 0) {
            this._baseDirection = 1;
        }
        if(this.group.rotation.y >= Math.PI/2) {
            this._baseDirection = -1;
        }
        this.group.rotation.y+=0.01*this._baseDirection;
    }

    rotateArm() {
        if(this._joint2.rotation.z >= 0) {
            this._joint2Direction = -1;
        }
        if(this._joint2.rotation.z <= -Math.PI/2) {
            this._joint2Direction = 1;
        }
        this._joint2.rotation.z+=0.03*this._joint2Direction;
    }
}