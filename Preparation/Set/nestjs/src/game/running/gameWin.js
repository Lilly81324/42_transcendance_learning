/**
 * @brief Checks and handles Victory condition
 * @param scene Scene whoose loop handles checking for win condition
 * @param playerMesh Mesh of the Player, needed for position check
 */
export function gameWin(scene, playerMesh)
{
	let won = false;
	let lost = false;
	scene.onBeforeRenderObservable.add(() => {
		if (!won && playerMesh.position.y < 1.8 && playerMesh.position.y > 1.5  && playerMesh.position.x > 7.5 && playerMesh.position.y < 8.5 )
		{
			alert("Congratulations! You won!");
			won = true;
		}
		if (!lost && playerMesh.position.y < -3)
		{
			alert("You lost! Hit F5 to reload and try again.");
			lost = true;
		}
	});
}