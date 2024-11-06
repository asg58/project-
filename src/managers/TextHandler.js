import * as THREE from 'three';  
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';  
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';  

export class TextHandler {  
    constructor(scene) {  
        this.scene = scene;  
        this.textMeshes = new Map();  
        this.fontLoader = new FontLoader();  
        this.nextId = 1;  
        this.font = null;  
    }  

    async createText(text, position = { x: 0, y: 0, z: 0 }) {  
        try {  
            if (!this.font) {  
                this.font = await this.loadFont();  
            }  

            const geometry = new TextGeometry(text, {  
                font: this.font,  
                size: 0.5,  
                height: 0.1,  
                curveSegments: 12,  
                bevelEnabled: true,  
                bevelThickness: 0.03,  
                bevelSize: 0.02,  
                bevelSegments: 5  
            });  

            const material = new THREE.MeshStandardMaterial({  
                color: 0xffffff,  
                metalness: 0.3,  
                roughness: 0.4  
            });  

            const mesh = new THREE.Mesh(geometry, material);  
            mesh.position.set(position.x, position.y, position.z);  
            mesh.userData.textId = this.nextId;  
            mesh.userData.materialType = 'standard';  
            mesh.userData.isSelected = false;  

            geometry.computeBoundingBox();  
            const centerOffset = geometry.boundingBox.getCenter(new THREE.Vector3());  
            geometry.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);  

            this.textMeshes.set(this.nextId, mesh);  
            this.scene.add(mesh);  

            return this.nextId++;  
        } catch (error) {  
            console.error('Error creating text:', error);  
            throw error;  
        }  
    }  

    loadFont() {  
        return new Promise((resolve, reject) => {  
            this.fontLoader.load(  
                '/assets/fonts/helvetiker_regular.typeface.json',  
                font => resolve(font),  
                undefined,  
                error => reject(error)  
            );  
        });  
    }  

    removeText(textId) {  
        const mesh = this.textMeshes.get(textId);  
        if (mesh) {  
            this.scene.remove(mesh);  
            if (mesh.geometry) mesh.geometry.dispose();  
            if (mesh.material) mesh.material.dispose();  
            this.textMeshes.delete(textId);  
        }  
    }  

    updateTextColor(textId, color) {  
        const mesh = this.textMeshes.get(textId);  
        if (mesh && mesh.material) {  
            mesh.material.color.setStyle(color);  
            if (mesh.userData.materialType === 'neon' && mesh.material.emissive) {  
                mesh.material.emissive.setStyle(color);  
            }  
        }  
    }  

    updateTextMaterial(textId, materialType) {  
        const mesh = this.textMeshes.get(textId);  
        if (!mesh) return;  

        const currentColor = mesh.material.color.getStyle();  
        let newMaterial;  

        switch (materialType) {  
            case 'standard':  
                newMaterial = new THREE.MeshStandardMaterial({  
                    color: currentColor,  
                    metalness: 0.3,  
                    roughness: 0.4  
                });  
                mesh.userData.materialType = 'standard';  
                break;  
            case 'neon':  
                newMaterial = new THREE.MeshStandardMaterial({  
                    color: currentColor,  
                    metalness: 0.2,  
                    roughness: 0.2,  
                    emissive: new THREE.Color(currentColor),  
                    emissiveIntensity: 2  
                });  
                mesh.userData.materialType = 'neon';  
                break;  
            case 'chrome':  
                newMaterial = new THREE.MeshStandardMaterial({  
                    color: currentColor,  
                    metalness: 1.0,  
                    roughness: 0.1  
                });  
                mesh.userData.materialType = 'chrome';  
                break;  
            default:  
                return;  
        }  

        if (mesh.material) {  
            mesh.material.dispose();  
        }  
        mesh.material = newMaterial;  

        if (mesh.userData.isSelected && materialType !== 'neon') {  
            mesh.material.emissive.setHex(0x555555);  
        }  
    }  

    getTextMesh(textId) {  
        return this.textMeshes.get(textId);  
    }  
}