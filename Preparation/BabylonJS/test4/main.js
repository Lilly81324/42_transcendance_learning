import { createScene } from "./building/createScene.js";
import { registerMovement } from "./running/registerMovement.js";
import { lock2d } from "./running/lock2d.js";
import { gameWin } from "./running/gameWin.js";

// Get the canvas element
const canvas = document.getElementById("renderCanvas");
// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Create scene object
const scene = new BABYLON.Scene(engine);

// Add Havoc Phys Engine and Gravity to scene
const havokInstance = await HavokPhysics();
const hk = new BABYLON.HavokPlugin(true, havokInstance);
scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

// Set up Scene
createScene(canvas, scene);

// Create Player Object
const box = new BABYLON.MeshBuilder.CreateBox("player", {height: 1.5,size: 0.5 }, scene);
box.position = new BABYLON.Vector3(-1, 4, 0);
const player = new BABYLON.PhysicsAggregate(
	box,
	BABYLON.PhysicsShapeType.BOX,
	{ mass: 1, friction: 0.5 },
	scene);

// Register to Central Gameplay Loop
registerMovement(scene, box, player);
lock2d(scene, box, player);
gameWin(scene, box);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});