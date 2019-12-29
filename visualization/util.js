'use strict';

class Util {
    static toRad(degrees) {
        var pi = Math.PI;
        return degrees * -(pi / 180);
    }

    static removeFromScene(scene, name) {
        let obj = scene.getObjectByName(name);
        scene.remove(obj);
    }

    static castShadows(properties) {
        properties.meshArray.forEach(e => {
            e.castShadow = properties.castShadows
            e.receiveShadow = properties.receiveShadows
        });
    }

    static dragAndDrop() {
        let objects = scene.children.filter(e => (e.type == "Group"));
        let dragControl = new THREE.DragControls(objects, camera, renderer.domElement);

        // add event listener to highlight dragged objects
        dragControl.addEventListener('dragstart', function (event) {
            controls.enabled = false;
        });

        dragControl.addEventListener('dragend', function (event) {
            controls.enabled = true;
        });
    }
}