import * as THREE from 'three';  

export class Camera {  
    constructor() {  
        this.camera = new THREE.PerspectiveCamera(  
            75,   
            window.innerWidth / window.innerHeight,  
            0.1,  
            1000  
        );  
        this.setupCamera();  
    }  

    setupCamera() {  
        this.camera.position.set(0, 5, 10);  
        this.camera.lookAt(0, 0, 0);  
    }  

    updateAspect(aspect) {  
        this.camera.aspect = aspect;  
        this.camera.updateProjectionMatrix();  
    }  
}