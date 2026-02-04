import { createGround } from "./createGround.js";
import { createCamera } from "./createCamera.js"

export function createScene(canvas, scene) {
	// Setup Camera and Ligthing
	const camera = createCamera(scene, canvas, 0, 2, 6);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

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
};