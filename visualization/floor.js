'use strict';

var WIDTH = 120;
var HEIGHT = 100;
var FLOOR_TEXTURE = 'https://files.gamebanana.com/img/ss/textures/5290c58f7ffcf.webp';

class Floor {
    buildFloor() {
        let geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT);
        geometry.rotateX(-Math.PI / 2.0);
        let texture = new THREE.TextureLoader().load( FLOOR_TEXTURE );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        
        let material = new THREE.MeshBasicMaterial( { map: texture } );
        return new THREE.Mesh( geometry, material );
    }
}
