# 3D Text Editor Project  

## Current Features  
- 3D text rendering  
- Multiple material types (normal, toon, neon effects)  
- Text customization (size, height, bevel)  
- Font selection system (in development)  

## Project Structure  
[# 3D Text Editor Project  

## Project Structuur  
project/  
├── index.html  
├── style.css  
├── src/  
│   ├── main.js  
│   │  
│   ├── core/           # Kernfunctionaliteit  
│   │   ├── Scene.js    # 3D scene beheer  
│   │   ├── Renderer.js # Three.js renderer setup  
│   │   ├── Camera.js   # Camera instellingen  
│   │   ├── Controls.js # Gebruikersinput controls  
│   │   └── Lighting.js # Lichtbronnen beheer  
│   │  
│   ├── managers/       # Beheersystemen  
│   │   ├── TextHandler.js      # Tekstmanipulatie  
│   │   ├── SelectionManager.js # Object selectie  
│   │   ├── UndoManager.js      # Undo/Redo functionaliteit  
│   │   ├── AnimationManager.js # Animatie beheer  
│   │   ├── SceneManager.js     # Scene status beheer  
│   │   ├── EffectsManager.js   # Visuele effekte  
│   │   └── ExportManager.js    # Export funksionaliteit  
│   │  
│   ├── ui/            # Gebruikersinterface  
│   │   ├── ColorPicker.js   # Kleurkiezer  
│   │   ├── StylePanel.js    # Stijlinstellingen  
│   │   ├── ToolBar.js       # Gereedschapsbalk  
│   │   ├── PropertyPanel.js # Eigenschappen paneel  
│   │   ├── Timeline.js      # Tydlyn vir animasies  
│   │   └── LayerPanel.js    # Lagenbeheer  
│   │  
│   ├── effects/       # Visuele effekte  
│   │   ├── NeonEffect.js    # Neon glow effect  
│   │   ├── ParticleSystem.js # Deeltjessysteem  
│   │   ├── ShadowEffect.js  # Skaduwe effekte  
│   │   └── PostProcessing.js # Nabewerking effekte  
│   │  
│   ├── utils/         # Hulpprogramma's  
│   │   ├── Constants.js      # Constante waarden  
│   │   ├── EventBus.js       # Event systeem  
│   │   ├── MaterialLibrary.js # Materiaal verzameling  
│   │   ├── GeometryUtils.js  # Geometrie hulpfuncties  
│   │   └── MathUtils.js      # Wiskundige hulpfuncties  
│   │  
│   └── features/      # Spesifieke funksies  
│       ├── TextStyles/     # Tekstopmaak  
│       │   ├── FontLoader.js  
│       │   └── StylePresets.js  
│       │  
│       ├── Animation/      # Animatie sisteem  
│       │   ├── AnimationTypes.js  
│       │   └── Keyframes.js  
│       │  
│       ├── Environment/    # Omgewingseffekte  
│       │   ├── Sky.js  
│       │   └── Weather.js  
│       │  
│       └── Audio/         # Geluidssisteem  
│           ├── AudioManager.js  
│           └── Visualizer.js  
│  
├── assets/           # Media lêers  
│   ├── fonts/       # Lettertipes  
│   │   └── helvetiker_regular.typeface.json  
│   │  
│   ├── textures/    # Teksture  
│   │   └── materials/  
│   │  
│   ├── models/      # 3D modelle  
│   │   └── presets/  
│   │  
│   └── audio/       # Geluidslêers  
│       └── effects/  
│  
└── lib/             # Eksterne biblioteke  
    └── three.js/    # Three.js bibliotek  

## Huidige Features  
- 3D tekstweergave  
- Materiaal systeem  
- Camera controls  
- Scene management  

## In Ontwikkeling  
- Font selector systeem  
- Animatie systeem  
- Export functionaliteit  

## Setup  
1. Clone de repository  
2. Installeer dependencies: `npm install`  
3. Start development server: `npm run dev`  

## Documentatie  
Elkeen van die komponent het sy eie verantwoordelikheid:  
- Core: Basis 3D engine funksionaliteit  
- Managers: Beheer van verskillende stelsels  
- UI: Gebruikersinterface komponente  
- Effects: Visuele effekte  
- Utils: Herbruikbare hulpfunksies  
- Features: Spesifieke produkfunksionaliteit]  

## Setup  
1. Clone the repository  
2. Run `npm install`  
3. Run `npm run dev`  

## Latest Updates  
- Added font selection feature  
- Improved material system  
- Fixed text centering issues