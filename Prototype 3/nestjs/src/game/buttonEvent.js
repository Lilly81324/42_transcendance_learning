export function buttonEvent(socket, scene)
{
	socket.on("msgToClient", (data) => {
		console.log(`Message from server ${data}`);
		const ref = scene.getMeshByName("sphere");
		ref.position.y = ref.position.y + 1;
	});
}
