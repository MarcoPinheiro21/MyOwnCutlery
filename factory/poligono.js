var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Add element
// scene.add( floor() );
scene.add( wall0() );
// scene.add( wall1() );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.z = 30;
controls.update();

// Functions
function animate() {
	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    renderer.render( scene, camera );
}
animate();

function floor() {
    var geometry = new THREE.PlaneGeometry(40, 20);
    var texture = new THREE.TextureLoader().load( 'https://files.gamebanana.com/img/ss/textures/5290c58f7ffcf.webp' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    return new THREE.Mesh( geometry, material );
}

function wall0() {
    var geometryWall = new THREE.PlaneGeometry(40, 10);
    // geometry.rotateX(Math.PI/2.0);
    // geometry.translate(0, -10, 5);

    var texture = new THREE.TextureLoader().load( 'http://bgfons.com/uploads/brick/brick_texture3464.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 3);

    var wallMaterial = new THREE.MeshBasicMaterial( { map: texture } );
    let wall = new THREE.Mesh(geometryWall, wallMaterial);


    var geometryDoor = new THREE.PlaneGeometry(5, 5);
    // geometryDoor.rotateX(Math.PI/2.0);
    // geometryDoor.translate(0, -10, 5);
    
    var doorMaterial = new THREE.MeshBasicMaterial();
    doorMaterial.transparent = true;
    let door = new THREE.Mesh(geometryDoor, doorMaterial);

    let wallBSP = new ThreeBSP(wall);
    let doorBSP = new ThreeBSP(door);

    let subtractBSP = wallBSP.subtract(doorBSP);
    var result = subtractBSP.toMesh(material);
    // not sure if cVN still necessary
    result.geometry.computeVertexNormals();
    return result;
}

function wall1() {
    var wall1Geometry = new THREE.PlaneGeometry(40, 10);
    wall1Geometry.rotateX(Math.PI/2.0);
    wall1Geometry.translate(0, 10, 5);
    return new THREE.Mesh( wall1Geometry);
}