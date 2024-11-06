// Controls.js - placeholder file
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';  

export class Controls {  
    constructor(camera, domElement) {  
        this.controls = new OrbitControls(camera, domElement);  
        this.setupControls();  
    }  

    setupControls() {  
        this.controls.enableDamping = true;  
        this.controls.dampingFactor = 0.05;  
        this.controls.screenSpacePanning = false;  
        this.controls.minDistance = 1;  
        this.controls.maxDistance = 50;  
        this.controls.maxPolarAngle = Math.PI / 2;  
    }  

    update() {  
        this.controls.update();  
    }  
}