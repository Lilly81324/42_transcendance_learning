export function createGround(scene)
{
	const bottom = -1;
	const groundShape = [
		new BABYLON.Vector3(19, 0, bottom),
		new BABYLON.Vector3(19, 0, 6),
		new BABYLON.Vector3(15, 0, 6),
		new BABYLON.Vector3(14, 0, 3),
		new BABYLON.Vector3(13, 0, 1.5),
		new BABYLON.Vector3(11, 0, 1.5),
		new BABYLON.Vector3(9, 0, 3.2),
		new BABYLON.Vector3(6, 0, 3.25),
		new BABYLON.Vector3(5, 0, 3),
		new BABYLON.Vector3(4, 0, 2.5),
		new BABYLON.Vector3(3, 0, 1.75),
		new BABYLON.Vector3(2, 0, 1.25),
		new BABYLON.Vector3(1, 0, 1),
		new BABYLON.Vector3(0, 0, 1),
		new BABYLON.Vector3(0, 0, bottom)
	];

	const ground = BABYLON.MeshBuilder.ExtrudePolygon("Ground_Box", {shape: groundShape, depth: 1}, scene);
	ground.rotation.x = -Math.PI / 2;
	ground.position = new BABYLON.Vector3(-9.5, 0, -0.5)

	const floorAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);

	return (floorAggregate);
}