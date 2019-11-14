const PLACEHOLDER_WIDTH = 12;
const PLACEHOLDER_HEIGHT = 0.5;
const PLACEHOLDER_DEPTH = 5;

function placeholder(name, position) {
    let group = new THREE.Group();
    group.name = name;

    let planeGeometry = new THREE.BoxGeometry( PLACEHOLDER_WIDTH, PLACEHOLDER_DEPTH, PLACEHOLDER_HEIGHT );
    planeGeometry.rotateX(-Math.PI/2);
    planeGeometry.translate(PLACEHOLDER_WIDTH/2.0,PLACEHOLDER_HEIGHT/2.0,-PLACEHOLDER_DEPTH/2.0);
    let material = new THREE.MeshStandardMaterial( {
        color: 0x23395d,
        flatShading: true,
        metalness: 0.5,
        roughness: 0.8,
        refractionRatio: 0.25

    } );
    let plane = new THREE.Mesh( planeGeometry, material )
    group.add(plane);

    var loader = new THREE.FontLoader();

    loader.load( configurationsApi.visualizationApi.url + '/fonts/helvetiker_regular.typeface.json', function ( font ) {

        let textGeometry = new THREE.TextGeometry( name, {
            font: font,
            size: 1,
            height: 0.3,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        
        textGeometry.translate(0, PLACEHOLDER_HEIGHT, 0);
        let material = new THREE.MeshStandardMaterial( {
            color: 0x8d021f,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.8,
            refractionRatio: 0.25
    
        } );
        let text = new THREE.Mesh( textGeometry, material )
        group.add(text);

        group.translateX(position.x);
        group.translateZ(position.z);
    } );

    scene.add( group );
}