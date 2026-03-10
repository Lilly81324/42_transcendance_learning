/**
 * @brief Creates the Camera
 * @param scene Scene to create the camera in
 * @param canvas Canvas that controls Camera Inputs
 * @param pos_x Number that describes the cameras x position
 * @param pos_y Number that describes the cameras y position
 * @param max_distance Number that describes how far the Camera may zoom out
 * @returns Camera
 */
export function createCamera(scene, canvas, pos_x = 0, pos_y = 0, max_distance = 8)
{
	const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
	camera.position = new BABYLON.Vector3(pos_x, pos_y, -max_distance);
	camera.target  = new BABYLON.Vector3(pos_x, pos_y, 0);
	camera.attachControl(canvas, true, false);
	camera.wheelPrecision = 20;
	camera.minZ = 0.3

	// Minimum Distance of Camera to target
	camera.lowerRadiusLimit = 2
	// Maximum Distance of Camera to target
	camera.upperRadiusLimit = max_distance
	
	// No rotating Camera
	camera.angularSensibilityX = 999999;
	camera.angularSensibilityY = 999999;
	// Make right click pan camera
	camera.useBouncingBehavior = false;
	camera.fov = 1

	// Limit Camera Movement and zoom
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

	return (camera);
}
