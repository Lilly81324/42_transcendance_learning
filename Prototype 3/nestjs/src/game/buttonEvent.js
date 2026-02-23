export function buttonEvent(socket, scene)
{
	let up = true;
	socket.on("msgToClient", (data) => {
		console.log(`Message from server ${data}`);
		const ref = scene.getMeshByName("sphere");
		const pos = ref.position.y;
		if (pos <= 1)
			up = true;
		else if (pos >= 3)
			up = false;
		if (up)
			ref.position.y = pos + 0.5;
		else
			ref.position.y = pos - 0.5;
	});
}


// d
// ud
// ud
// u
