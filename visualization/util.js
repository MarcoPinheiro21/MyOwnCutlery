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
}