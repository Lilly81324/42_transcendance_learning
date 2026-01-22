function buildRoof(position, scene)
{
	// Create Material for Roof
	const material = new BABYLON.StandardMaterial("Roof Material", scene);

	// Create Texture for Base
	material.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/textures/crate.png", scene);

	// Create Roof
	const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.5, height: 1.0, tessellation: 3, faceUV: uvMap, wrap: true});
	roof.scaling.x = 0.6;
	roof.rotation.z = Math.PI / 2;
    roof.position.x = position.x;
	roof.position.y = position.y + 1.22;
    roof.position.z = position.z;
    roof.material = material;
	return (roof);
}

/**
 * 
 * @param {BABYLON.Vector3} position Position for the box
 * @param {BABYLON.scene} scene Scene to place in
 * @returns 
 */
function buildBase(position, scene)
{
	// Create Material for Base
	const material = new BABYLON.StandardMaterial("House Material", scene);
	
	// Create Texture for Base
	material.diffuseTexture = new BABYLON.Texture("textures/violentdays_large.jpg", scene);

	// Create Box with given Mapping and Material
	const box = new BABYLON.MeshBuilder.CreateBox("box", scene)
	box.material = material;
	return (box);
}

/**
 * 
 * @param position BABYLON.Vector3 type that points to current position
 */
export function buildHouse(position, scene)
{
	const house = new BABYLON.Mesh.MergeMeshes(
		[buildBase(position, scene), buildRoof(position, scene)],
		true,
		false,
		null,
		false,
		true)
	return (house);
}