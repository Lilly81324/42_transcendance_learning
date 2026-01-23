export function createSky(scene)
{
	// UV-Wrap
	let uvMap = [];
	uvMap[0] = new BABYLON.Vector4(0,		(1/3),	0.25,	(2/3));
	uvMap[1] = new BABYLON.Vector4(0.25,	(1/3),	0.5,	(2/3));
	uvMap[2] = new BABYLON.Vector4(0.5,		(1/3),	0.75,	(2/3));
	uvMap[3] = new BABYLON.Vector4(0.75,	(1/3),	1.0,	(2/3));
	uvMap[4] = new BABYLON.Vector4(0.25,	(2/3),	0.5,	 1);
	uvMap[5] = new BABYLON.Vector4(0.25,	0,		0.5,	 (1/3));

	// Skybox
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {faceUV: uvMap, wrap: true, size:100.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.Texture("textures/violentdays_large.jpg", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;		
}
