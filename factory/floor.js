/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const WIDTH = 120;
const HEIGHT = 100;
const FLOOR_TEXTURE = 'https://files.gamebanana.com/img/ss/textures/5290c58f7ffcf.webp';

/** 
 * **************************************************************************************************
 * FUNCTIONS
 * **************************************************************************************************
 *  */

function floor() {
    var geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT);
    geometry.rotateX(-Math.PI / 2.0);
    var texture = new THREE.TextureLoader().load( FLOOR_TEXTURE );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    return new THREE.Mesh( geometry, material );
}
