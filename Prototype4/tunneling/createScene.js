import { createCamera } from "./createCamera.js";

function createPlayer(scene) {
    // Create Mesh
    var box1 = BABYLON.MeshBuilder.CreateBox("player", {size: 0.5, height: 0.7,}, scene);
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, segments: 10}, scene);
    sphere.position.y = 0.35;
    var player = BABYLON.Mesh.MergeMeshes([box1, sphere], true, false, null, false, false);
    player.position.y = 2;
    player.rotation.z = Math.PI * (3/4);

    let left = false;
    let right = false;
    let up = false;
    let down = false;
    let rot_r = false;
    let rot_l = false;
    const speed = 0.05;
    const rot_speed = 0.025;
    scene.onKeyboardObservable.add((kbInfo) => {
        // Is Button down or up?
        let setBool = kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN ? true : false;

        if (kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN || 
            kbInfo.type == BABYLON.KeyboardEventTypes.KEYUP) {
            if (kbInfo.event.key == "a")
                left = setBool;
            if (kbInfo.event.key == "d")
                right = setBool;
            if (kbInfo.event.key == "w")
                up = setBool;
            if (kbInfo.event.key == "s")
                down = setBool;
            if (kbInfo.event.key == "q")
                rot_r = setBool;
            if (kbInfo.event.key == "e")
                rot_l = setBool;
        }
    });
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnEveryFrameTrigger,
        () => {
            if (rot_r)
                player.rotation.z = player.rotation.z + rot_speed;
            if (rot_l)
                player.rotation.z = player.rotation.z - rot_speed;
            if (up)
                player.position.y = player.position.y + speed;
            if (down)
                player.position.y = player.position.y - speed;
            if (right)
                player.position.x = player.position.x + speed;
            if (left)
                player.position.x = player.position.x - speed;
        }
    ));
    return (player);
}

// In radians
function angleToVector(angle) {
    var result = [-Math.sin(angle), Math.cos(angle)];
    return (result);
}

function registerProjectiles(game, player) {
    const magnitude = 0.4;
    let proj_counter = 0;
    game.scene.onKeyboardObservable.add((kbInfo) => {
    if (kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN &&
        kbInfo.event.key == " ")
        {
            const new_proj = BABYLON.MeshBuilder.CreateSphere("projectile_" + proj_counter, {segments: 10, diameter: 0.3}, game.scene);
            const directionVector = angleToVector(player.rotation.z);
            const speed = 1000;
            new_proj.rotation.z = player.rotation.z;
            directionVector[0] *= magnitude;
            directionVector[1] *= magnitude;
            new_proj.position = new BABYLON.Vector3(
                player.position.x + directionVector[0],
                player.position.y + directionVector[1],
                0
            )
            new_proj.physicsAggregate = new BABYLON.PhysicsAggregate(new_proj, BABYLON.PhysicsShapeType.SPHERE, {mass: 1}, game.scene);
            new_proj.physicsAggregate.body.setCollisionCallbackEnabled(true);
            new_proj.physicsAggregate.body.applyForce(new BABYLON.Vector3(directionVector[0] * speed, directionVector[1] * speed, 0), new_proj.getAbsolutePosition());
            new_proj.physicsAggregate.body.getCollisionObservable().add((event) => {
                if (event.collidedAgainst.transformNode.name == "ground") {
					game.ground.affectTerrain(event.point.x, event.point.y, 0.5)
                    new_proj.dispose();
                }
            });
            proj_counter++;
        }
    });
}

export function createScene (game, canvas) {
    // This creates and positions a free camera (non-mesh)
    var camera = createCamera(game.scene, canvas, 0, 0, 10)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), game.scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var player = createPlayer(game.scene);
    registerProjectiles(game, player);
};