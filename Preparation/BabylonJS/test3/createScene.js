import { createVillage } from "./createVillage.js";
import { particle_fire1 } from "./particle_fire1.js";
import { createSky } from "./createSky.js";

export function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);

	// Setup Camera and Ligthing
	const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	// Build a Box
	const box = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height:1, depth:1}, scene);

return scene;
};