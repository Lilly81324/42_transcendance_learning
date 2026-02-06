/**
 * @brief Checks and handles Victory condition
 * @param scene Scene whoose loop handles checking for win condition
 */
export function gameWin(scene)
{
	let won = false;
	scene.onBeforeRenderObservable.add(() => {
		if (!won && box.position < 3)
		{
			alert("You won!");
			won = true;
		}
	});
}