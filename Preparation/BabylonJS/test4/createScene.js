import { createGround } from "./createGround.js";
import { createCamera } from "./createCamera.js"

export function createScene(engine, canvas, scene) {
	// Setup Camera and Ligthing
	const camera = createCamera(scene, canvas, 0, 2, 13.5);

	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

	// Create Ground
	const ground = createGround(scene);

	scene.beforeRender = function () {
		// Formula based on total zoom to determine width when zoomed in
		const width = camera.upperRadiusLimit * 0.74 -1.475;
		// Formula to calculate how zoomed in we are
		const zoom_ratio = (1- ((camera.radius - camera.lowerRadiusLimit) / (camera.upperRadiusLimit - camera.lowerRadiusLimit)));
		const xLimit = width * zoom_ratio;
		if (camera.target.x < -xLimit)
		camera.target.x = -xLimit;
		else if (camera.target.x > xLimit)
		camera.target.x = xLimit;
	}
};