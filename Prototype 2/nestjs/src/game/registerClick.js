/**
 * @brief Handles Contols
 * @param scene Scene that handles the rendering loop
 * @param mesh Visual mesh of the Player
 * @param body Physics Object of the Player
 */
export function registerClick(scene, mesh, physObj)
{
	let lastJumped = 0;

	scene.onPointerDown.add(click => {

		click.
		if (fun.event.key === "w") {
			if (Date.now() - lastJumped >= 1000)
			{
				lastJumped = Date.now();
				physObj.body.applyForce(new BABYLON.Vector3(0, 400, 0), mesh.getAbsolutePosition());
			}
		}
		const maxSpeed = 4;
		const accel = 30;
		const velocity = new BABYLON.Vector3(0, 0, 0);
		physObj.body.getLinearVelocityToRef(velocity);
		if (fun.event.key === "a") {
			if (velocity.x > -maxSpeed)
			physObj.body.applyForce(new BABYLON.Vector3(-accel, 0, 0), mesh.getAbsolutePosition());
		}
		if (fun.event.key === "d") {
			if (velocity.x < maxSpeed)
			physObj.body.applyForce(new BABYLON.Vector3(accel, 0, 0), mesh.getAbsolutePosition());
		}
	});
}