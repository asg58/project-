export class UndoRedoManager {  
    constructor() {  
        this.undoStack = [];  
        this.redoStack = [];  
        this.maxStackSize = 50;  
    }  

    addAction(action) {  
        this.undoStack.push(action);  
        this.redoStack = [];  
        if (this.undoStack.length > this.maxStackSize) {  
            this.undoStack.shift();  
        }  
    }  

    undo() {  
        if (this.undoStack.length > 0) {  
            const action = this.undoStack.pop();  
            this.redoStack.push(action);  
            action.undo();  
        }  
    }  

    redo() {  
        if (this.redoStack.length > 0) {  
            const action = this.redoStack.pop();  
            this.undoStack.push(action);  
            action.redo();  
        }  
    }  
}