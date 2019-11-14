"use strict";
class PressMachine {
    constructor() {
        this.pressGroup = new THREE.Group();
        this.leftPressArm = new THREE.Group();
        this.rightPressArm = new THREE.Group();
        this.isRightExtending = true;
        this.isLeftExtending = true;
    }
    buildHydraulicPress(position) {
        var geometry = new THREE.BoxGeometry(4, 10, 4);
        var geometryTop = new THREE.BoxGeometry(4, 4, 16);
        var geometryPress = new THREE.BoxGeometry(2, 2, 1);
        var materialPress = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
        var materialMachine = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
        /* Machine structure*/
        var cubeLeft = new THREE.Mesh(geometry, materialMachine);
        var cubeRigt = new THREE.Mesh(geometry, materialMachine);
        var cubeTop = new THREE.Mesh(geometryTop, materialMachine);
        cubeLeft.position.set(0, 0, 0);
        cubeRigt.position.set(0, 0, 12);
        cubeTop.position.set(0, 7, 6);
        this.pressGroup.add(cubeLeft);
        this.pressGroup.add(cubeRigt);
        this.pressGroup.add(cubeTop);
        /*----------*/
        var geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 3.8, 32);
        var materialCylinder = new THREE.MeshBasicMaterial({ color: 0x000000 });
        /* Left Arm*/
        var cylinderLeft = new THREE.Mesh(geometryCylinder, materialCylinder);
        cylinderLeft.rotation.x = Math.PI / 2;
        cylinderLeft.position.set(0, 0, 0.1);
        /* Left Press*/
        var pressLeft = new THREE.Mesh(geometryPress, materialPress);
        pressLeft.position.set(0, 0, 2.5);
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
        /*Left Press*/
        var pressRight = new THREE.Mesh(geometryPress, materialPress);
        pressRight.position.set(0, 0, -2.5);
        /*---*/
        this.rightPressArm.add(cylinderRight);
        this.rightPressArm.add(pressRight);
        this.rightPressArm.position.set(0, 2.5, 11.5);
        this.pressGroup.add(this.rightPressArm);
        /*----------*/
        this.pressGroup.position.set(position.x, position.y, position.z);
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