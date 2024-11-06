// src/ui/ToolBar.js  
export class ToolBar {  
    constructor(app) {  
        this.app = app;  
        this.container = document.createElement('div');  
        this.container.id = 'toolbar';  
        this.setupUI();  
    }  

    setupUI() {  
        this.addTextButton();  
        this.addColorPicker();  
        this.addMaterialSelect();  
        this.addEffectsControls();  
        document.body.appendChild(this.container);  
    }  

    addTextButton() {  
        const button = document.createElement('button');  
        button.textContent = 'Add Text';  
        button.onclick = () => this.createNewText();  
        this.container.appendChild(button);  
    }  

    addColorPicker() {  
        const colorPicker = document.createElement('input');  
        colorPicker.type = 'color';  
        colorPicker.value = '#ffffff';  
        colorPicker.onchange = (e) => {  
            if (this.app.textHandler.selectedTextId) {  
                this.app.textHandler.updateTextColor(  
                    this.app.textHandler.selectedTextId,  
                    e.target.value  
                );  
            }  
        };  
        this.container.appendChild(colorPicker);  
    }  

    addMaterialSelect() {  
        const select = document.createElement('select');  
        const materials = ['standard', 'neon', 'chrome'];  
        
        materials.forEach(material => {  
            const option = document.createElement('option');  
            option.value = material;  
            option.textContent = material.charAt(0).toUpperCase() + material.slice(1);  
            select.appendChild(option);  
        });  

        select.onchange = (e) => {  
            if (this.app.textHandler.selectedTextId) {  
                this.app.textHandler.updateTextMaterial(  
                    this.app.textHandler.selectedTextId,  
                    e.target.value  
                );  
            }  
        };  

        this.container.appendChild(select);  
    }  

    addEffectsControls() {  
        const neonButton = document.createElement('button');  
        neonButton.textContent = 'Toggle Neon';  
        neonButton.onclick = () => {  
            if (this.app.textHandler.selectedTextId) {  
                this.app.textHandler.setNeonEffect(  
                    this.app.textHandler.selectedTextId  
                );  
            }  
        };  
        this.container.appendChild(neonButton);  
    }  

    createNewText() {  
        const text = prompt('Enter text:', 'Hello 3D!');  
        if (text) {  
            const id = this.app.textHandler.createText(text, { x: 0, y: 0, z: 0 });  
            this.app.textHandler.selectText(id);  
        }  
    }  
}