import { particle_fire1 } from "./particle_fire1.js";

export function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);

	BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/box.babylon");

	const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	particle_fire1(scene, 1, new BABYLON.Vector3(0, 0, 0));

return scene;
};