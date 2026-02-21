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


/**
 * @brief Creates a GUI and Button
 * @param scene Scene to put button in 
 */
export function createGui(scene, canvas)
{
    const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "GUI",
        false,
        scene,
    );

    const button = BABYLON.GUI.Button.CreateSimpleButton("send", "SEND");
    setButtonSize(button, canvas, 0.2);
    setButtonPos(button, canvas, 1, 1);
    button.color = "#FFF";
    button.onPointerUpObservable.add(() => {
        alert("Button pressed");
    })
    gui.addControl(button);
    return (gui)
}