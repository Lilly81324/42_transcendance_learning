/**
 * @brief Checks and handles Victory condition
 * @param scene Scene whoose loop handles checking for win condition
 * @param playerMesh Mesh of the Player, needed for position check
 */
export function gameWin(scene, playerMesh)
{
	let won = false;
	scene.onBeforeRenderObservable.add(() => {
		if (!won && playerMesh.position.y < 3)
		{
			alert("You won!");
			won = true;
		}
	});
}