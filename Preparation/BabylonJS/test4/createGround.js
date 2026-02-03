export function createGround(scene)
{
	const box = BABYLON.MeshBuilder.CreateBox("Ground_Box", {width: 10, height: 3, depth: 1}, scene);

	const hill1 = BABYLON.MeshBuilder.CreateCylinder("Ground_Big_Hill", {height: 1, diameter: 4, tessellation: 100}, scene);
	hill1.position = new BABYLON.Vector3(3, 1.3, 0);
	hill1.rotation.x = Math.PI / 2;

	const hill2 = BABYLON.MeshBuilder.CreateCylinder("Ground_Small_Hill", {height: 1, diameter: 4, tessellation: 100}, scene);
	hill2.position = new BABYLON.Vector3(-3, 1.2, 0);
	hill2.rotation.x = Math.PI / 2;
	hill2.scaling.z = 0.5

	const ground = BABYLON.Mesh.MergeMeshes([box, hill1, hill2], true, false, null, true, true);
	ground.position.z = 1;
	return (ground);
}