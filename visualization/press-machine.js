"use strict";

var BASE_TEXTURE = './textures/yellowStripes.png';

class PressMachine {
    constructor(name) {
        this.armMaterial  = new THREE.MeshStandardMaterial({
            color: 0xfeff08,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });

        this.pressGroup = new THREE.Group();
        this.pressGroup.name = name;
        this.leftPressArm = new THREE.Group();
        this.rightPressArm = new THREE.Group();
        this.isRightExtending = true;
        this.isLeftExtending = true;
    }
    buildHydraulicPress(position) {
        var geometry = new THREE.BoxGeometry(4, 10, 4);
        var geometryTop = new THREE.BoxGeometry(4, 4, 16);
        var geometryPress = new THREE.BoxGeometry(2, 2, 1);
        let texture = new THREE.TextureLoader().load(BASE_TEXTURE);
        var materialPress = new THREE.MeshBasicMaterial({ map: texture });
        var materialMachine = new THREE.MeshStandardMaterial({
            color: 0xfeff08,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });
        /* Machine structure*/
        var cubeLeft = new THREE.Mesh(geometry, materialMachine);
        var cubeRigt = new THREE.Mesh(geometry, materialMachine);
        var cubeTop = new THREE.Mesh(geometryTop, materialMachine);
        cubeLeft.position.set(0, 0, 0);
        cubeRigt.position.set(0, 0, 12);
        cubeTop.position.set(0, 7, 6);
        cubeLeft.userData.parentGroup = this.pressGroup.name;
        cubeRigt.userData.parentGroup = this.pressGroup.name;
        cubeTop.userData.parentGroup = this.pressGroup.name;
        this.pressGroup.add(cubeLeft);
        this.pressGroup.add(cubeRigt);
        this.pressGroup.add(cubeTop);
        /*----------*/
        var geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 3.8, 32);
        var materialCylinder = new THREE.MeshStandardMaterial({
            color: 0x777777,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });

        /* Left Arm*/
        var cylinderLeft = new THREE.Mesh(geometryCylinder, materialCylinder);
        cylinderLeft.rotation.x = Math.PI / 2;
        cylinderLeft.position.set(0, 0, 0.1);
        cylinderLeft.userData.parentGroup = this.pressGroup.name;
        /* Left Press*/
        var pressLeft = new THREE.Mesh(geometryPress, materialPress);
        pressLeft.position.set(0, 0, 2.5);
        pressLeft.userData.parentGroup = this.pressGroup.name;
        /*---*/
        this.leftPressArm.add(cylinderLeft);
        this.leftPressArm.add(pressLeft);
        this.leftPressArm.position.set(0, 2.5, 0.5);
        this.pressGroup.add(this.leftPressArm);
        /*----------*/
        /*Right Arm*/
        var cylinderRight = new THREE.Mesh(geometryCylinder, materialCylinder);
        cylinderRight.rotation.x = -Math.PI / 2;
        cylinderRight.position.set(0, 0, -0.1);
        cylinderRight.userData.parentGroup = this.pressGroup.name;
        /*Left Press*/
        var pressRight = new THREE.Mesh(geometryPress, materialPress);
        pressRight.position.set(0, 0, -2.5);
        pressRight.userData.parentGroup = this.pressGroup.name;
        /*---*/
        this.rightPressArm.add(cylinderRight);
        this.rightPressArm.add(pressRight);
        this.rightPressArm.position.set(0, 2.5, 11.5);
        this.pressGroup.add(this.rightPressArm);
        /*----------*/
        this.pressGroup.position.set(position.x, position.y, position.z);
        this.pressGroup.rotateY(Math.PI /2.0);
        return this.pressGroup;
    }
    timeoutPressArm() {
        if (this.leftPressArm.position.z == 2.5) {
            this.isLeftExtending = false;
        }
        if (this.rightPressArm.position.z == 9.5) {
            this.isRightExtending = false;
        }
        if (this.leftPressArm.position.z == 0.5) {
            this.isLeftExtending = true;
        }
        if (this.rightPressArm.position.z == 11.5) {
            this.isRightExtending = true;
        }
        if (this.isLeftExtending) {
            this.leftPressArm.position.z += 0.05;
            this.leftPressArm.position.z =
                Math.round(this.leftPressArm.position.z * 100) / 100;
        } else {
            this.leftPressArm.position.z -= 0.05;
            this.leftPressArm.position.z =
                Math.round(this.leftPressArm.position.z * 100) / 100;
        }
        if (this.isRightExtending) {
            this.rightPressArm.position.z -= 0.05;
            this.rightPressArm.position.z =
                Math.round(this.rightPressArm.position.z * 100) / 100;
        } else {
            this.rightPressArm.position.z += 0.05;
            this.rightPressArm.position.z =
                Math.round(this.rightPressArm.position.z * 100) / 100;
        }
    }
}