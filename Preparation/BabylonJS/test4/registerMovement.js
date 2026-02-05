export function registerMovement(scene, mesh, physObj)
{
	let lastJumped = 0;

	scene.onKeyboardObservable.add(fun => {
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
		player.body.getLinearVelocityToRef(velocity);
		if (e.event.key === "a") {
			if (velocity.x > -maxSpeed)
			player.body.applyForce(new BABYLON.Vector3(-accel, 0, 0), box.getAbsolutePosition());
		}
		if (e.event.key === "d") {
			if (velocity.x < maxSpeed)
			player.body.applyForce(new BABYLON.Vector3(accel, 0, 0), box.getAbsolutePosition());
		}
	});
}