import { createGround } from "./createGround.js";
import { createCamera } from "./createCamera.js"

/**
 * @brief Handles setting up all the Objects and meshes for the scene
 * @param canvas Canvas Element on the Page that handles camera controls
 * @param scene Scene to work on
 */
export function createScene(canvas, scene) {
	const camera = createCamera(scene, canvas, 0, 2, 13.5);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
	const ground = createGround(scene);
};