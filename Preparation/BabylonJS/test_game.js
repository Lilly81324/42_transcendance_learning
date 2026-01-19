

export const createScene = function () => {

	// Create scene for objects
	const scene = new BABYLON.Scene(engine);

	// Create interactable Camera
	const camera = new BABYLON.ArcRotateCamera("camera_name", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);

	// Add neccesary ligthing, aiming in the specified direction
	const light = new BABYLON.HemisphericLight("light_name", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

	// Add an object as example
	const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);


	return scene;
}