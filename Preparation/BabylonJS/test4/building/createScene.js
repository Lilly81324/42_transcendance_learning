import { createGround } from "./createGround.js";
import { createCamera } from "./createCamera.js"

/**
 * @brief Handles setting up all the Objects and meshes for the scene
 * @param canvas Canvas Element on the Page that handles camera controls
 * @param scene Scene to work on
 */
export async function createScene(canvas, scene) {
	const camera = createCamera(scene, canvas, 0, 2, 13.5);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
	const ground = createGround(scene);

	// added new, should be reworked ASP
	const box = BABYLON.MeshBuilder.CreateBox("positive", {height: 3}, scene);
	box.position.y = 5;
	box.position.x = 8;
	box.setEnabled(false);
	const boxCSG = BABYLON.CSG2.FromMesh(box);
	const groundCSG = BABYLON.CSG2.FromMesh(scene.meshes[0]);
	const result = groundCSG.subtract(boxCSG);
	const resultMesh = result.toMesh("New Ground", scene);
	scene.meshes[0].dispose();
	boxCSG.dispose();
	groundCSG.dispose();
	box.dispose();
	ground.dispose();
	const newGroundAggr = new BABYLON.PhysicsAggregate(resultMesh, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
};