/**
 * @brief Set Buttons Size based on fraction
 * @param button Button object to work with
 * @param size 1 means use full canvas, 0 means non-existant
 */
function setButtonSize(button, canvas, size)
{
    let frac = Math.min(canvas.height, canvas.width) * size;
    button.widthInPixels = frac;
    button.heightInPixels = frac;
}

/**
 * @brief Moves Button to position based on fractions
 * @note Buttons width and height need to be set with button.widthInPixels or this wont work
 * @param button Button object to work with
 * @param canvas Canvas to get limits of screen
 * @param pos_x 1=right, 0=middle, -1=left
 * @param pos_y 1=bottom, 0=middle, -1=top
 */
function setButtonPos(button, canvas, pos_x, pos_y)
{
    button.left =  pos_x * ((canvas.width - button.widthInPixels) / 2);
    button.top =  pos_y * ((canvas.height - button.heightInPixels) / 2);
}

function addSocketStateToUi(gui, canvas, socket)
{
    const socket_status = new BABYLON.GUI.TextBlock("socket_status", "Connection Status: Disconnected");
    socket_status.fontSize = 24;
    socket_status.color = "red";
    const size = socket_status.fontSize.replace('px', '');
    socket_status.left =  -1 * ((canvas.width - size * 15) / 2);
    socket_status.top =  -1 * ((canvas.height - size) / 2);
    gui.addControl(socket_status);

    socket.on("connect", () => {
        const size = socket_status.fontSize.replace('px', '');
        socket_status.text = "Connection Status: Connected";
        socket_status.color = "green";
        socket_status.left =  -1 * ((canvas.width - size * 13.5) / 2);
	});

    socket.on("disconnect", () => {
        const size = socket_status.fontSize.replace('px', '');
        socket_status.text = "Connection Status: Disconnected";
        socket_status.color = "red";
        socket_status.left =  -1 * ((canvas.width - size * 15) / 2);
	});

    socket.on("connect_error", () => {
        const size = socket_status.fontSize.replace('px', '');
        socket_status.text = "Connection Status: Disconnected";
        socket_status.color = "red";
        socket_status.left =  -1 * ((canvas.width - size * 15) / 2);
	});

    return (gui)
}

/**
 * @brief Creates a GUI and Button
 * @param scene Scene to put button in 
 */
export function createGui(scene, canvas, socket)
{
    let count = 0;
    const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "GUI",
        false,
        scene,
    );

    addSocketStateToUi(gui, canvas, socket);

    const button = BABYLON.GUI.Button.CreateSimpleButton("send", "SEND");
    setButtonSize(button, canvas, 0.2);
    setButtonPos(button, canvas, 1, 1);
    button.color = "#FFF";
    button.onPointerUpObservable.add(() => {
        count++;
        const data = {
            type: "User clicked",
            timestamp: Date.now(),
            message: `User pressed button for the ${count} time`,
        };
        if (socket && socket.connected) {
            socket.emit('msgToServer', JSON.stringify(data));
        } else {
            console.warn("No Websocket Connection established");
        }
    })
    gui.addControl(button);
    return (gui)
}