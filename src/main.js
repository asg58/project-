import * as THREE from 'three';  
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  
import { TextHandler } from './managers/TextHandler.js';  

class Application {  
    constructor() {  
        this.loadApplication();  
    }  

    async loadApplication() {  
        try {  
            await this.init();  
            this.setupUI();  
            await this.createInitialText();  
            this.hideLoading();  
        } catch (error) {  
            console.error('Error loading application:', error);  
            this.showError();  
        }  
    }  

    hideLoading() {  
        const loadingElement = document.getElementById('loading');  
        if (loadingElement) {  
            loadingElement.style.display = 'none';  
        }  
    }  

    showError() {  
        const loadingElement = document.getElementById('loading');  
        const errorElement = document.getElementById('error-message');  
        if (loadingElement) {  
            loadingElement.style.display = 'none';  
        }  
        if (errorElement) {  
            errorElement.style.display = 'block';  
        }  
    }  

    init() {  
        // Scene  
        this.scene = new THREE.Scene();  
        this.scene.background = new THREE.Color(0x1a1a1a);  

        // Camera  
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
        this.camera.position.z = 5;  

        // Renderer  
        this.renderer = new THREE.WebGLRenderer({ antialias: true });  
        this.renderer.setSize(window.innerWidth, window.innerHeight);  
        this.renderer.setPixelRatio(window.devicePixelRatio);  
        document.getElementById('scene-container').appendChild(this.renderer.domElement);  

        // Controls  
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);  
        this.controls.enableDamping = true;  
        this.controls.dampingFactor = 0.05;  

        // Lighting  
        this.setupLighting();  

        // Text Handler  
        this.textHandler = new TextHandler(this.scene);  

        // Raycaster voor object selectie  
        this.raycaster = new THREE.Raycaster();  
        this.mouse = new THREE.Vector2();  
        this.selectedObject = null;  

        // Event Listeners  
        window.addEventListener('resize', this.onWindowResize.bind(this));  
        this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));  

        // Start Animation Loop  
        this.animate();  
    }  

    setupLighting() {  
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  
        this.scene.add(ambientLight);  

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);  
        directionalLight.position.set(5, 5, 5);  
        this.scene.add(directionalLight);  

        const pointLight = new THREE.PointLight(0xffffff, 0.5);  
        pointLight.position.set(-5, -5, -5);  
        this.scene.add(pointLight);  
    }  

    setupUI() {  
        const toolbar = document.createElement('div');  
        toolbar.style.position = 'fixed';  
        toolbar.style.top = '20px';  
        toolbar.style.left = '20px';  
        toolbar.style.backgroundColor = 'rgba(0,0,0,0.7)';  
        toolbar.style.padding = '10px';  
        toolbar.style.borderRadius = '5px';  
        toolbar.style.zIndex = '1000';  

        // Add Text Button  
        const addTextBtn = document.createElement('button');  
        addTextBtn.textContent = 'Add Text';  
        addTextBtn.onclick = () => this.addNewText();  
        toolbar.appendChild(addTextBtn);  

        // Color Picker  
        const colorPicker = document.createElement('input');  
        colorPicker.type = 'color';  
        colorPicker.value = '#ffffff';  
        colorPicker.style.marginLeft = '10px';  
        colorPicker.addEventListener('input', (e) => {  
            if (this.selectedObject && this.selectedObject.userData.textId) {  
                this.textHandler.updateTextColor(this.selectedObject.userData.textId, e.target.value);  
            }  
        });  
        toolbar.appendChild(colorPicker);  

        // Material Select  
        const materialSelect = document.createElement('select');  
        materialSelect.style.marginLeft = '10px';  
        ['standard', 'neon', 'chrome'].forEach(material => {  
            const option = document.createElement('option');  
            option.value = material;  
            option.textContent = material.charAt(0).toUpperCase() + material.slice(1);  
            materialSelect.appendChild(option);  
        });  
        materialSelect.addEventListener('change', (e) => {  
            if (this.selectedObject && this.selectedObject.userData.textId) {  
                this.textHandler.updateTextMaterial(this.selectedObject.userData.textId, e.target.value);  
            }  
        });  
        toolbar.appendChild(materialSelect);  

        // Delete Button  
        const deleteBtn = document.createElement('button');  
        deleteBtn.textContent = 'Delete';  
        deleteBtn.style.marginLeft = '10px';  
        deleteBtn.style.backgroundColor = '#ff4444';  
        deleteBtn.onclick = () => this.deleteSelectedText();  
        toolbar.appendChild(deleteBtn);  

        document.body.appendChild(toolbar);  
    }  

    async createInitialText() {  
        await this.textHandler.createText("Hello World", { x: 0, y: 0, z: 0 });  
    }  

    addNewText() {  
        const text = prompt('Enter text:', 'Hello');  
        if (text) {  
            this.textHandler.createText(text, { x: 0, y: 0, z: 0 });  
        }  
    }  

    deleteSelectedText() {  
        if (this.selectedObject && this.selectedObject.userData.textId) {  
            this.textHandler.removeText(this.selectedObject.userData.textId);  
            this.selectedObject = null;  
        }  
    }  

    onMouseDown(event) {  
        event.preventDefault();  
        
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;  
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;  

        this.raycaster.setFromCamera(this.mouse, this.camera);  
        const intersects = this.raycaster.intersectObjects(this.scene.children);  

        // Reset previous selection  
        if (this.selectedObject && this.selectedObject.material) {  
            const isNeon = this.selectedObject.userData.materialType === 'neon';  
            if (!isNeon && this.selectedObject.material.emissive) {  
                this.selectedObject.material.emissive.setHex(0x000000);  
            }  
            this.selectedObject.userData.isSelected = false;  
        }  

        if (intersects.length > 0) {  
            this.selectedObject = intersects[0].object;  
            if (this.selectedObject.material) {  
                const isNeon = this.selectedObject.userData.materialType === 'neon';  
                if (!isNeon && this.selectedObject.material.emissive) {  
                    this.selectedObject.material.emissive.setHex(0x555555);  
                }  
                this.selectedObject.userData.isSelected = true;  
            }  
        } else {  
            this.selectedObject = null;  
        }  
    }  

    onWindowResize() {  
        this.camera.aspect = window.innerWidth / window.innerHeight;  
        this.camera.updateProjectionMatrix();  
        this.renderer.setSize(window.innerWidth, window.innerHeight);  
    }  

    animate() {  
        requestAnimationFrame(this.animate.bind(this));  
        this.controls.update();  
        this.renderer.render(this.scene, this.camera);  
    }  
}  

// Start the application  
new Application();