import { createScene } from "./createScene.js";
import { registerMovement } from "./registerMovement.js";

function lock2D(mesh, body) {
	mesh.position.z = 0;

	const e = mesh.rotationQuaternion.toEulerAngles();
	mesh.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0,0,e.z);

	body.body.setAngularVelocity(new BABYLON.Vector3(0,0,body.body.getAngularVelocity().z));
}

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Create meshes
const scene = new BABYLON.Scene(engine);

// Add Havoc Phys Engine and Gravity to scene
const havokInstance = await HavokPhysics();
const hk = new BABYLON.HavokPlugin(true, havokInstance);
scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

// Set up Scene
createScene(engine, canvas, scene);

const box = new BABYLON.MeshBuilder.CreateBox("player", {height: 1.5,size: 0.5 }, scene);
box.position = new BABYLON.Vector3(-1, 4, 0);

const player = new BABYLON.PhysicsAggregate(
box,
BABYLON.PhysicsShapeType.BOX,
{ mass: 1, friction: 0.5 },
scene);

// --- INPUT ---
registerMovement(scene, box, player);

// --- 2D LOCKING ---
scene.onBeforeRenderObservable.add(() => {
	lock2D(box, player);
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});