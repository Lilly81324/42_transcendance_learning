import { createScene } from "./createScene.js";
import TerrainDestruction from "./TerrainDestruction.js";
import Vector from "./Vector.js";

// Get the canvas element
const canvas = document.getElementById("renderCanvas");
// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Create scene object
const scene = new BABYLON.Scene(engine);
scene.actionManager = new BABYLON.ActionManager(scene);

// Add Havoc Phys Engine and Gravity to scene
const havokInstance = await HavokPhysics();
const hk = new BABYLON.HavokPlugin(true, havokInstance);
scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

let array = [
	new BABYLON.Vector3(5, 0, -2),
	new BABYLON.Vector3(5, 0, 0),
	new BABYLON.Vector3(4, 0, 1),
	new BABYLON.Vector3(-4, 0, 1),
	new BABYLON.Vector3(-5, 0, 0),
	new BABYLON.Vector3(-5, 0, -2)
];
const ground = new DestructibleGround(scene, true, array, 1, "ground");

const game = {scene: scene, ground: ground};

// Set up Scene
createScene(game);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});