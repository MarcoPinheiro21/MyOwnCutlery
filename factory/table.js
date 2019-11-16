'use strict';

var TABLE_LEG_WIDTH = 2;
var TABLE_LEG_HEIGHT = 10;
var TABLE_LEG_DEPTH = 2;

var TABLE_TOP_WIDTH = 40;
var TABLE_TOP_HEIGHT = 2;
var TABLE_TOP_DEPTH = 2;

var DISTANCE_WIDTH_BETWEEN_LEGS = 20;
var DISTANCE_HEIGHT_BETWEEN_LEGS = 10;

var TABLE_COLOR = 0xbebebe;

var N_LEGS = 4;
var N_BARS = 2;
var N_CYLINDERS = 21;

class Table {
    constructor(name) {
        this.group = new THREE.Group();
        this.group.name = name;
    }

    buildTable(scale, position) {
        let legs = [];
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

        this.group.add(tableStructure);
        this.group.add(treadmill);

        this.group.scale.set(scale, scale, scale);
        this.group.translateX(position.x);
        this.group.translateY(position.y);
        this.group.translateZ(position.z);
        return this.group;
    }

    // Legs
    _tableLeg() {
        var geometry = new THREE.BoxGeometry(TABLE_LEG_WIDTH, TABLE_LEG_HEIGHT, TABLE_LEG_DEPTH);
        return new THREE.Mesh(geometry);
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
        var geometry = new THREE.BoxGeometry(TABLE_TOP_WIDTH, TABLE_TOP_HEIGHT, TABLE_TOP_DEPTH);
        return new THREE.Mesh(geometry);
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
        var geometry = new THREE.CylinderGeometry(TABLE_TOP_HEIGHT / 2.0, TABLE_TOP_HEIGHT / 2.0, DISTANCE_HEIGHT_BETWEEN_LEGS, 32);
        return new THREE.Mesh(geometry);
    }

    _repositionCylinder(geometry, i) {
        geometry.rotateX(Math.PI / 2.0);
        geometry.translate(TABLE_TOP_WIDTH / 2.0 - (TABLE_TOP_HEIGHT / 2.0 + 1) * i, TABLE_LEG_HEIGHT + TABLE_TOP_HEIGHT / 2.0, 0);
    }
}