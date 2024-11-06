// Renderer.js - placeholder file
import * as THREE from 'three';  

export class Renderer {  
    constructor() {  
        this.renderer = new THREE.WebGLRenderer({ antialias: true });  
        this.setupRenderer();  
    }  

    setupRenderer() {  
        this.renderer.setSize(window.innerWidth, window.innerHeight);  
        this.renderer.setPixelRatio(window.devicePixelRatio);  
        this.renderer.shadowMap.enabled = true;  
        document.getElementById('viewport').appendChild(this.renderer.domElement);  
    }  

    render(scene, camera) {  
        this.renderer.render(scene, camera);  
    }  

    setSize(width, height) {  
        this.renderer.setSize(width, height);  
    }  
}