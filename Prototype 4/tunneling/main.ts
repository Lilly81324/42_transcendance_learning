import { createScene } from "./createScene.js";
import { DestructibleGround } from "./DestructibleGround.js";
import { Vector } from "./Vector.js";
import { Scene, Engine, ActionManager, Vector2, Vector3, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

// Get the canvas element
const canvas = document.getElementById("renderCanvas");
// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true);

// Create scene object
const scene = new Scene(engine);
scene.actionManager = new ActionManager(scene);

// Add Havoc Phys Engine and Gravity to scene
try {
	const HavokPhysics = (await import("@babylonjs/havok")).default;
	const havokInterface = await HavokPhysics();
	const plugin = new HavokPlugin(undefined, havokInterface);
	scene.enablePhysics(new Vector3(0, -9.81, 0), plugin);
} catch (error) {
	console.warn("Babylon physics plugin failed to initialize. Physics features will be disabled.", error);
}

let array = [
	new Vector3(0, 0, 0),
	new Vector3(0, 0, 5),
	new Vector3(-3, 0, 5),
	new Vector3(-3, 0, 11),
	new Vector3(0, 0, 11),
	new Vector3(0, 0, 12),
	new Vector3(-7, 0, 12),
	new Vector3(-7, 0, 11),
	new Vector3(-4, 0, 11),
	new Vector3(-4, 0, 5),
	new Vector3(7, 0, 5),
	new Vector3(7, 0, 0),
	new Vector3(4, 0, 0),
	new Vector3(4, 0, 1),
	new Vector3(6, 0, 1),
	new Vector3(6, 0, 2),
	new Vector3(1, 0, 2),
	new Vector3(1, 0, 1),
	new Vector3(3, 0, 1),
	new Vector3(3, 0, 0),
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