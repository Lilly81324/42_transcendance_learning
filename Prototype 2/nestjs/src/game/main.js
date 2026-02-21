import { createScene } from "./createScene.js";
import { registerClick } from "./registerClick.js";
import * as GUI from 'babylonjs-gui';

// Get the canvas element
const canvas = document.getElementById("renderCanvas");
// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Create scene object
const scene = createScene(canvas, engine);

// Register to Central Gameplay Loop
registerClick(scene, box, player);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});