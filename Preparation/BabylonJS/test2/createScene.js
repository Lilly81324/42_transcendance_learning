import { createVillage } from "./createVillage.js";
import { particle_fire1 } from "./particle_fire1.js";
import { createSky } from "./createSky.js";
import { createCar } from "./createCar.js";

export function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);

	// Setup Camera and Ligthing
	const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	// Create Ground
	const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 30});
    ground.material = new BABYLON.StandardMaterial("Ground Material", scene);
    ground.material.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/textures/sand.jpg", scene);

	// Build a "House"
	createVillage(scene);
	particle_fire1(scene, 1, new BABYLON.Vector3(0, 1.7, 0));
	createSky(scene);
	createCar(scene);

return scene;
};