/**
 * @brief Register that on letting go of mouse button a message is logged
 */
export function registerClick(scene)
{
	scene.onPointerObservable.add(pointerInfo => {
	if (pointerInfo.type == BABYLON.PointerEventTypes.POINTERDOWN)
		console.log("Event " + pointerInfo.type + " at x: " + pointerInfo.event.offsetX + " y: " + pointerInfo.event.offsetY);
	});
}