import { createGround } from "./createGround.js";
import { createCamera } from "./createCamera.js"

export function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);

	// Setup Camera and Ligthing
	const camera = createCamera(scene, 0, 2, 6);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	const box = new BABYLON.MeshBuilder.CreateBox("Box2", {width: 1, height: 1, depth: 1}, scene);
	box.position = new BABYLON.Vector3(-7.07, 0, 1);
	box.rotation.y = Math.PI / 4 * 3

	// Create Ground
	const ground = createGround(scene);

	scene.beforeRender = function () {
		const width = 9.3;
		const zoom_ratio = (1- ((camera.radius - camera.lowerRadiusLimit) / (camera.upperRadiusLimit - camera.lowerRadiusLimit)));
		const xLimit = (width / 2) * zoom_ratio;
		if (camera.target.x < -xLimit)
		camera.target.x = -xLimit;
		else if (camera.target.x > xLimit)
		camera.target.x = xLimit;
		}

	return scene;
	};