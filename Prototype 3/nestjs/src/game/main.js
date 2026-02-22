import { createScene } from "./createScene.js";
import { registerClick } from "./registerClick.js";
import { initWebSocket } from "./initWebSocket.js"

// Get the canvas element
const canvas = document.getElementById("renderCanvas");
// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

const socket = initWebSocket("ws://localhost:443");

// Create scene object
const scene = createScene(canvas, engine, socket);

// Register to Central Gameplay Loop
registerClick(scene);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});