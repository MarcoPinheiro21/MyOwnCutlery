'use strict';

class LigthHelper {

    static directionalLigth() {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.castShadow = true;
        directionalLight.position.set(0, 100, 0);
        
        directionalLight.shadow.mapSize.width = 4000;
        directionalLight.shadow.mapSize.height = 4000;
        
        directionalLight.shadow.camera.near = 0.5;       
        directionalLight.shadow.camera.far = 500;      
        directionalLight.shadow.camera.left = -500;
        directionalLight.shadow.camera.bottom = -500;
        directionalLight.shadow.camera.right = 500;
        directionalLight.shadow.camera.top = 500;

        return directionalLight;
    }

    static ambientLight() {
        return new THREE.AmbientLight(0x666666); // soft white light
    }

    static spotLight(properties) {
        properties.postions.forEach(pos => {
            let light = new THREE.SpotLight(0xFFFFFF);
            light.position.set(pos.x, pos.y, pos.z);
            light.target.position.set(pos.x, 0, pos.z);
            
            light.angle = 1;
            light.penumbra = 0.2;

            light.castShadow = true;

            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;

            light.shadow.camera.near = 500;
            light.shadow.camera.far = 4000;
            light.shadow.camera.fov = 30;

            properties.scene.add(light);
            properties.scene.add(light.target);
        });    
    }
}