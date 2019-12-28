'use strict';

var TABLE_LEG_WIDTH = 2;
var TABLE_LEG_HEIGHT = 10;
var TABLE_LEG_DEPTH = 2;

var TABLE_TOP_WIDTH = 80;
var TABLE_TOP_HEIGHT = 2;
var TABLE_TOP_DEPTH = 2;

var DISTANCE_WIDTH_BETWEEN_LEGS = 20;
var DISTANCE_HEIGHT_BETWEEN_LEGS = 10;

var TABLE_COLOR = 0xbebebe;

var N_LEGS = 4;
var N_BARS = 2;
var N_CYLINDERS = 41;

class Table {
    constructor(properties) {
        this._properties = properties;
        this.group = new THREE.Group();
        this.group.name = this._properties.name;
    }


    buildProductionLine(scale, position) {
        this.group.add(this.buildTable(scale, { x: 30, y: position.y, z: position.z }));
        this.group.add(this.buildTable(scale, { x: 10, y: position.y, z: position.z }));
        this.group.add(this.buildTable(scale, { x: -10, y: position.y, z: position.z }));
        this.group.add(this.buildTable(scale, { x: -30, y: position.y, z: position.z }));
        return this.group;
    }

    buildTable(scale, position) {
        let meshArray = [];

        let localGroup = new THREE.Group();
        let legs = [];
        let i;
        // Get 4 legs
        for (i = 0; i < N_LEGS; i++) {
            let mesh = this._tableLeg();
            this._repositionLeg(mesh.geometry, i);
            legs.push(mesh);
        }

        // Table bars
        let bars = [];
        for (i = 0; i < N_BARS; i++) {
            let mesh = this._tableTopBar();
            this._repositionBar(mesh.geometry, i);
            bars.push(mesh);
        }

        // Cylinders
        let cylinders = [];
        for (i = 0; i < N_CYLINDERS; i++) {
            let mesh = this._cylinder();
            this._repositionCylinder(mesh.geometry, i);
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

        let tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x777777,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
        });
        let tableStructure = new THREE.Mesh(tableGeometry, tableMaterial);
        meshArray.push(tableStructure);

        let treadmillGeometry = new THREE.Geometry();
        cylinders.forEach(e => {
            treadmillGeometry.merge(e.geometry);
        });

        let treadmillMaterial = new THREE.MeshStandardMaterial({
            color: 0x0b2b26,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25

        });
        let treadmill = new THREE.Mesh(treadmillGeometry, treadmillMaterial);
        meshArray.push(treadmill);

        localGroup.add(tableStructure);
        localGroup.add(treadmill);

        localGroup.scale.set(scale, scale, scale);
        localGroup.translateX(position.x);
        localGroup.translateY(position.y);
        localGroup.translateZ(position.z);

        Util.castShadows({
            meshArray: meshArray,
            castShadows: this._properties.castShadows,
            receiveShadows: this._properties.receiveShadows
        });

        return localGroup;
    }

    // Legs
    _tableLeg() {
        let geometry = new THREE.BoxGeometry(TABLE_LEG_WIDTH, TABLE_LEG_HEIGHT, TABLE_LEG_DEPTH);
        let mesh = new THREE.Mesh(geometry);
        mesh.castShadow = true;
        return mesh;
    }

    _repositionLeg(geometry, i) {
        let positions = [
            { x: DISTANCE_WIDTH_BETWEEN_LEGS / 2.0, y: TABLE_LEG_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: DISTANCE_WIDTH_BETWEEN_LEGS / 2.0, y: TABLE_LEG_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: -DISTANCE_WIDTH_BETWEEN_LEGS / 2.0, y: TABLE_LEG_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: -DISTANCE_WIDTH_BETWEEN_LEGS / 2.0, y: TABLE_LEG_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 }
        ];

        geometry.translate(positions[i].x, positions[i].y, positions[i].z);
    }

    // Top
    _tableTopBar() {
        let geometry = new THREE.BoxGeometry(TABLE_TOP_WIDTH, TABLE_TOP_HEIGHT, TABLE_TOP_DEPTH);
        let mesh = new THREE.Mesh(geometry);
        mesh.castShadow = true;
        return mesh;
    }

    _repositionBar(geometry, i) {
        let positions = [
            { x: 0, y: TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: 0, y: TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
        ];

        geometry.translate(positions[i].x, positions[i].y, positions[i].z);
    }

    // Cylinders
    _cylinder() {
        let geometry = new THREE.CylinderGeometry(TABLE_TOP_HEIGHT / 2.0, TABLE_TOP_HEIGHT / 2.0, DISTANCE_HEIGHT_BETWEEN_LEGS, 32);
        let mesh = new THREE.Mesh(geometry);
        mesh.castShadow = true;
        return mesh;
    }

    _repositionCylinder(geometry, i) {
        geometry.rotateX(Math.PI / 2.0);
        geometry.translate(TABLE_TOP_WIDTH / 2.0 - (TABLE_TOP_HEIGHT / 2.0 + 1) * i, TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT / 2.0, 0);
    }
}