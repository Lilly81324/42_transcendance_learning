import { buildHouse } from "./buildHouse.js";

export function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);

	BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/box.babylon");

	const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10});

	buildHouse(new BABYLON.Vector3(0, 0, 0), scene);

return scene;
};