'use strict';

var WIDTH = 200;
var HEIGHT = 200;

class Floor {
    constructor(properties) {
        this._properties = properties;
    }

    buildFloor() {
        let geometry = new THREE.PlaneBufferGeometry(WIDTH, HEIGHT);
        geometry.rotateX(-Math.PI / 2.0);
        
        let material = new THREE.MeshLambertMaterial( { color: 0x42423e} );
        let floor = new THREE.Mesh( geometry, material );
        floor.name = this._properties.name;
        
        floor.receiveShadow = this._properties.receiveShadows;
        
        return floor;
    }
}
