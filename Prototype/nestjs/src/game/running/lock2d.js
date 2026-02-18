/**
 * @brief Makes player object only move in 2d space
 * @param scene Scene that handles the rendering loop
 * @param mesh Visual mesh of the Player
 * @param body Physics Object of the Player
 */
export function lock2d(scene, mesh, body)
{
	scene.onBeforeRenderObservable.add(() => {
		mesh.position.z = 0;

		const e = mesh.rotationQuaternion.toEulerAngles();
		mesh.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0,0,e.z);

		body.body.setAngularVelocity(new BABYLON.Vector3(0,0,body.body.getAngularVelocity().z));
	});
}
