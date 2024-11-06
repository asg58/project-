// src/managers/MaterialManager.js  
import * as THREE from 'three';  

export class MaterialManager {  
    constructor() {  
        this.materials = new Map();  
        this.setupDefaultMaterials();  
    }  

    setupDefaultMaterials() {  
        // Standaard materiaal  
        this.materials.set('standard', {  
            create: (color = 0xffffff) => new THREE.MeshStandardMaterial({  
                color: color,  
                metalness: 0.3,  
                roughness: 0.4  
            })  
        });  

        // Neon materiaal  
        this.materials.set('neon', {  
            create: (color = 0xffffff) => {  
                const material = new THREE.MeshPhysicalMaterial({  
                    color: color,  
                    emissive: color,  
                    emissiveIntensity: 2,  
                    metalness: 0,  
                    roughness: 0.2,  
                    clearcoat: 1,  
                    clearcoatRoughness: 0  
                });  
                return material;  
            }  
        });  

        // Chrome materiaal  
        this.materials.set('chrome', {  
            create: (color = 0xffffff) => new THREE.MeshPhysicalMaterial({  
                color: color,  
                metalness: 1,  
                roughness: 0,  
                clearcoat: 1  
            })  
        });  

        // Matte materiaal  
        this.materials.set('matte', {  
            create: (color = 0xffffff) => new THREE.MeshStandardMaterial({  
                color: color,  
                metalness: 0,  
                roughness: 1  
            })  
        });  
    }  

    getMaterial(type, color) {  
        const materialCreator = this.materials.get(type);  
        return materialCreator ? materialCreator.create(color) : null;  
    }  
}