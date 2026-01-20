/**
 * @param scene on which to display particle
 * @param size Size of fire (works best at 1)
 * @param posVector new BABYLON.Vector3 for position of fire
 * @returns Created Particle System
 */
export const particle_fire1 = (scene, size, posVector) => {
		// Create a particle system
	const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	// Texture of each particle
	particleSystem.particleTexture = new BABYLON.Texture("textures/sun.png");
	
	var boxEmitter = new BABYLON.Vector3(0, 0, 0);
	
	particleSystem.emitter = boxEmitter;
	particleSystem.createDirectedSphereEmitter(0.7, new BABYLON.Vector3(-0.2, 1, -0.2), new BABYLON.Vector3(0.3, 1, 0.3));

	// Make them oblong
	particleSystem.minScaleY = 1.0;
	particleSystem.maxScaleY = 3.0;

	// Make many
	particleSystem.emitRate = 1000;

	// Size of fire (unimportant)
	particleSystem.maxLifeTime = size

	// Speed of each particle (Intensity of Fire)
	particleSystem.minEmitPower = 0.0;
	particleSystem.maxEmitPower = 5.0;

	// Control size of fire
	particleSystem.addSizeGradient(0, 0.5);
	particleSystem.addSizeGradient(0.5, 0);

	// Graininess of fire
	particleSystem.addColorGradient(0.02, BABYLON.Color3.Red(), BABYLON.Color3.Yellow());
	particleSystem.addColorGradient(size * 0.8, BABYLON.Color3.Black());
	particleSystem.start();

	return (particleSystem);
}