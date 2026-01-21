function buildRoof(position, scene)
{
	// Create Material for Roof
	const material = new BABYLON.StandardMaterial("Roof Material", scene);

	// Create Texture for Base
	material.diffuseTexture = new BABYLON.Texture("https://img.freepik.com/premium-vector/old-roof-tiles-seamless-background_172107-207.jpg", scene);

	// Map Texture to Roof
	const uvMap = [];
	uvMap[0] = new BABYLON.Vector4(0, 0, 0.5, 0.5);
	uvMap[1] = new BABYLON.Vector4(0, 0.5, 0.5, 1);
	uvMap[2] = new BABYLON.Vector4(0.5, 0, 1, 0.5);
	uvMap[3] = new BABYLON.Vector4(0.5, 0.5, 1, 1);

	// Create Roof
	const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.5, height: 1.0, tessellation: 3, faceUV: uvMap, wrap: true});
	roof.scaling.x = 0.6;
	roof.rotation.z = Math.PI / 2;
    roof.position.x = position.x;
	roof.position.y = position.y + 1.22;
    roof.position.z = position.z;
    roof.material = material;
}

/**
 * 
 * @param position BABYLON.Vector3 type that points to current position
 */
export function buildHouse(position, scene)
{
	// Create Material for Base
	const material = new BABYLON.StandardMaterial("House Material", scene);
	
	// Create Texture for Base
	material.diffuseTexture = new BABYLON.Texture("textures/violentdays_large.jpg", scene);

	// Map Texture for Base
	let uvMap = [];
	uvMap[0] = new BABYLON.Vector4(0,		(1/3),	0.25,	(2/3));
	uvMap[1] = new BABYLON.Vector4(0.25,	(1/3),	0.5,	(2/3));
	uvMap[2] = new BABYLON.Vector4(0.5,		(1/3),	0.75,	(2/3));
	uvMap[3] = new BABYLON.Vector4(0.75,	(1/3),	1.0,	(2/3));
	uvMap[4] = new BABYLON.Vector4(0.25,	(2/3),	0.5,	 1);
	uvMap[5] = new BABYLON.Vector4(0.25,	0,		0.5,	 (1/3));

	// Create Box with given Mapping and Material
	const box = new BABYLON.MeshBuilder.CreateBox("box", {faceUV: uvMap, wrap: true}, scene)
	box.position.x = position.x;
	box.position.y = position.y + 0.5
	box.position.z = position.z;
	box.material = material;

	buildRoof(position, scene);
}