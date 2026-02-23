export function initWebSocket(url) {
	const socket = io(url, {
		transports: ['websocket']
	});

	socket.on("connect", () => {
		console.log("Connected to Backend");
	});
	
	// socket.on("msgToClient", (data) => {
	// 	console.log(`Message from server ${data}`);
	// });
	
	socket.on("connect_error", (error) => {
		console.log("Error with websocket: ", error);
	});
	
	socket.on("disconnect", () => {
		console.log("Connection closed");
	});

	return (socket);
}