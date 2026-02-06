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
		if (!won && box.position.y < 1.8 && box.position.y > 1.5  && box.position.x > 7.5 && box.position.y < 8.5 )
		{
			alert("Congratulations! You won!");
			won = true;
		}
		if (!lost && box.position.y < -3)
		{
			alert("You lost! Hit F5 to reload and try again.");
			lost = true;
		}
	});
}