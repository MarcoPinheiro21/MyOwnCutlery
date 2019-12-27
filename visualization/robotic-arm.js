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
    constructor(properties) {
        this._properties = properties;
        this._group = new THREE.Group();
        this._group.name = this._properties.name;
        
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
        let meshArray = [];
        let sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

        //Base
        let cilynderGeometry = new THREE.CylinderGeometry(BASE_RADIUS, BASE_RADIUS, BASE_HEIGHT, 32);
        let texture = new THREE.TextureLoader().load(BASE_TEXTURE);
        let mat = new THREE.MeshBasicMaterial({ map: texture });
        this._cylinder = new THREE.Mesh(cilynderGeometry, mat);
        meshArray.push(this._cylinder);

        cilynderGeometry.translate(0, BASE_HEIGHT / 2, 0);
        this._cylinder.userData.parentGroup = this._group.name;

        //Joint1
        this._joint1 = new THREE.Mesh(sphereGeometry, this.jointSphereMaterial  );
        meshArray.push(this._joint1);
        this._joint1.translateY(BASE_HEIGHT);
        this._joint1.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), SEGMENT1_ANGLE);
        this._joint1.userData.parentGroup = this._group.name;
        this._cylinder.add(this._joint1);

        //Segment 1
        let boxGeometry = new THREE.BoxGeometry(SEGMENT1_WIDTH, SEGMENT1_HEIGHT, SEGMENT1_DEPTH);
        this._segment1 = new THREE.Mesh(boxGeometry, this.armMaterial );
        meshArray.push(this._segment1);
        this._segment1.translateY(SEGMENT1_HEIGHT / 2);
        this._segment1.userData.parentGroup = this._group.name;
        this._joint1.add(this._segment1);

        //this._joint2
        this._joint2 = new THREE.Mesh(sphereGeometry, this.jointSphereMaterial );
        meshArray.push(this._joint2);
        this._joint2.translateY(SEGMENT1_HEIGHT / 2);
        // this._joint2.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), SEGMENT2_ANGLE);
        this._joint2.userData.parentGroup = this._group.name;
        this._segment1.add(this._joint2);

        //Segment 2
        let boxGeometry2 = new THREE.BoxGeometry(SEGMENT2_WIDTH, SEGMENT2_HEIGHT, SEGMENT2_DEPTH);
        this._segment2 = new THREE.Mesh(boxGeometry2, this.armMaterial );
        meshArray.push(this._segment2);
        this._segment2.translateY(SEGMENT2_HEIGHT / 2);
        this._segment2.userData.parentGroup = this._group.name;
        this._joint2.add(this._segment2);

        //Joint3
        let cyl1 = new THREE.CylinderGeometry(0.5, 0.5, 1.01, 16);
        this._joint3 = new THREE.Mesh(cyl1, this.jointSphereMaterial );
        meshArray.push(this._joint3);
        cyl1.rotateX(Util.toRad(90));
        this._joint3.translateY(SEGMENT2_HEIGHT / 2);
        this._joint3.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), WRIST_ANGLE);
        this._joint3.userData.parentGroup = this._group.name;
        this._segment2.add(this._joint3);

        //Wrist
        let boxGeometry3 = new THREE.BoxGeometry(WRIST_WIDTH, WRIST_HEIGHT, WRIST_DEPTH);
        this._wrist = new THREE.Mesh(boxGeometry3, this.armMaterial );
        meshArray.push(this._wrist);
        this._wrist.translateY(WRIST_HEIGHT / 2);
        this._wrist.userData.parentGroup = this._group.name;
        this._joint3.add(this._wrist);

        //Joint4
        let boxGeometry4 = new THREE.BoxGeometry(CLAW_BASE_WIDTH, CLAW_BASE_HEIGHT, CLAW_BASE_DEPTH);
        this._joint4 = new THREE.Mesh(boxGeometry4, this.armMaterial );
        meshArray.push(this._joint4);
        this._joint4.translateY(WRIST_HEIGHT / 2 + CLAW_BASE_HEIGHT / 2);
        this._joint4.userData.parentGroup = this._group.name;
        this._wrist.add(this._joint4);

        //Claws
        let cyl2 = new THREE.CylinderGeometry(CLAW_WIDTH, CLAW_WIDTH, CLAW_LENGTH, 16);
        let material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this._claw1 = new THREE.Mesh(cyl2, material);
        meshArray.push(this._claw1);
        this._claw2 = new THREE.Mesh(cyl2, material);
        meshArray.push(this._claw2);
        this._claw1.translateY(CLAW_LENGTH / 2);
        this._claw2.translateY(CLAW_LENGTH / 2);
        this._claw1.translateZ(CLAW_DISTANCE);
        this._claw2.translateZ(-CLAW_DISTANCE);
        this._claw1.userData.parentGroup = this._group.name;
        this._claw2.userData.parentGroup = this._group.name;
        this._joint4.add(this._claw1);
        this._joint4.add(this._claw2);

        this._group.add(this._cylinder);
        this._group.translateX(pos.x + OFFSET_X);
        this._group.translateY(pos.y);
        this._group.translateZ(pos.z + OFFSET_Z);
        this._group.rotateY(-Util.toRad(OFFSET_ANGLE));

        this._group.userData.tooltipText = 'text';

        Util.castShadows(
            { 
                meshArray: meshArray, 
                castShadows: this._properties.castShadows,
                receiveShadows: this._properties.receiveShadows
            }
        );

        return this._group;
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