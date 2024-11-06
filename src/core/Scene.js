import * as THREE from 'three';  

export class Scene {  
    constructor() {  
        this.scene = new THREE.Scene();  
        this.scene.background = new THREE.Color(0x1a1a1a);  
        this.setupLighting();  
    }  

    setupLighting() {  
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  
        this.scene.add(ambientLight);  

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);  
        directionalLight.position.set(0, 1, 1);  
        this.scene.add(directionalLight);  
    }  

    add(object) {  
        this.scene.add(object);  
    }  

    remove(object) {  
        this.scene.remove(object);  
    }  

    getScene() {  
        return this.scene;  
    }  
}