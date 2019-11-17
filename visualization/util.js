class Util {
    static toRad(degrees) {
        var pi = Math.PI;
        return degrees * -(pi / 180);
    }

    static removeFromScene(scene, name) {
        let obj = scene.getObjectByName(name);
        scene.remove(obj);
    }
}