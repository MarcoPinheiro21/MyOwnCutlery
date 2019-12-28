'use strict';

var WORKTABLE_LEG_WIDTH = 2;
var WORKTABLE_LEG_HEIGHT = 10;
var WORKTABLE_LEG_DEPTH = 2;

var WORKTABLE_TOP_WIDTH = 15;
var WORKTABLE_TOP_HEIGHT = 2;
var WORKTABLE_TOP_DEPTH = 2;

var DISTANCE_WIDTH_BETWEEN_LEGS = 20;
var DISTANCE_HEIGHT_BETWEEN_LEGS = 10;

var WORKTABLE_COLOR = 0xbebebe;

var N_LEGS = 4;
var N_BARS = 2;


class WorkTable {
    constructor(properties) {
        this._properties = properties;
        this.group = new THREE.Group();
        this.group.name = this._properties.name;
    }

    buildWorkLine(scale, position) {
        this.group.add(this.buildWorkTable(scale, { x: position.x, y: position.y, z: position.z }));
        return this.group;
    }

    buildWorkTable(scale, position) {
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
            let mesh2 = this._tableTopBarCenter();
            this._repositionBar(mesh.geometry, i);
            this._repositionBarCenter(mesh2.geometry, i);
            bars.push(mesh);
            bars.push(mesh2);

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
        let centerTable = [];

        centerTable.forEach(e => {
            treadmillGeometry.merge(e.geometry);
        });

        let treadmillMaterial = new THREE.MeshStandardMaterial({
            color: 0x777777,
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
            { x: DISTANCE_WIDTH_BETWEEN_LEGS / 4.0, y: WORKTABLE_LEG_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: DISTANCE_WIDTH_BETWEEN_LEGS / 4.0, y: WORKTABLE_LEG_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: -DISTANCE_WIDTH_BETWEEN_LEGS / 4.0, y: WORKTABLE_LEG_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: -DISTANCE_WIDTH_BETWEEN_LEGS / 4.0, y: WORKTABLE_LEG_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 }
        ];

        geometry.translate(positions[i].x, positions[i].y, positions[i].z);
    }

    // Top
    _tableTopBar() {
        let geometry = new THREE.BoxGeometry(WORKTABLE_TOP_WIDTH, WORKTABLE_TOP_HEIGHT, WORKTABLE_TOP_DEPTH);
        let mesh = new THREE.Mesh(geometry);
        mesh.castShadow = true;
        return mesh;
    }
    _tableTopBarCenter() {
        let geometry = new THREE.BoxGeometry(WORKTABLE_TOP_WIDTH, WORKTABLE_TOP_HEIGHT, WORKTABLE_TOP_DEPTH + 6);
        let mesh = new THREE.Mesh(geometry);
        mesh.castShadow = true;
        return mesh;
    }

    _repositionBarCenter(geometry, i) {
        let positions = [
            { x: 0, y: WORKTABLE_LEG_HEIGHT + WORKTABLE_TOP_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 4.0 },
            { x: 0, y: WORKTABLE_LEG_HEIGHT + WORKTABLE_TOP_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 4.0 },
        ];

        geometry.translate(positions[i].x, positions[i].y, positions[i].z);
    }

    _repositionBar(geometry, i) {
        let positions = [
            { x: 0, y: WORKTABLE_LEG_HEIGHT + WORKTABLE_TOP_HEIGHT / 2.0, z: DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
            { x: 0, y: WORKTABLE_LEG_HEIGHT + WORKTABLE_TOP_HEIGHT / 2.0, z: -DISTANCE_HEIGHT_BETWEEN_LEGS / 2.0 },
        ];

        geometry.translate(positions[i].x, positions[i].y, positions[i].z);
    }
}