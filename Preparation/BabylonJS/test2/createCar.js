function makeWheels(scene, scale, parent)
{
    const dis_x = -0.2 * scale;
    const dis_y = -0.2 * scale;
    const wheelUV = [];
    // Backside
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    // Tread
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    // Frontside
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    const wheels = [];
    wheels[0] = BABYLON.MeshBuilder.CreateCylinder("wheel", {height: 0.05 * scale, diameter: 0.15 * scale, tessellation: 40, faceUV: wheelUV}, scene);
    wheels[0].material = new BABYLON.StandardMaterial("Wheel Material", scene);
    wheels[0].material.diffuseTexture = new BABYLON.Texture("/textures/wheel-side.png", scene);
    wheels[0].parent = parent;
    wheels[0].position.x = 0.05 * scale;
    wheels[0].position.y = 0;
    wheels[0].position.z = -0.1 * scale;
    wheels[1] = wheels[0].clone("Wheel 2");
    wheels[1].position.y = dis_y
    wheels[2] = wheels[0].clone("Wheel 2");
    wheels[2].position.x = dis_x
    wheels[3] = wheels[0].clone("Wheel 3");
    wheels[3].position.y = dis_y;
    wheels[3].position.x = dis_x;
    return (wheels);
}

function makeCar(scene, scale)
{
    // Car body
    const outline = [
    new BABYLON.Vector3(-0.3 * scale, 0, -0.1 * scale),
    new BABYLON.Vector3(0.2 * scale, 0, -0.1 * scale),
    ]

    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * scale * Math.cos(i * Math.PI / 40), 0, 0.2 * scale * Math.sin(i * Math.PI / 40) - (0.1 * scale)));
    }
    outline.push(new BABYLON.Vector3(0, 0, 0.1 * scale));
    outline.push(new BABYLON.Vector3(-0.3 * scale, 0, 0.1 * scale));
   
    // UV Wrap Textue
    const uv_car = [];
    uv_car[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    uv_car[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    uv_car[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

    // Build Car
    const car_base = BABYLON.MeshBuilder.ExtrudePolygon("Car Base", {shape: outline, depth: 0.2 * scale, faceUV: uv_car, wrap: true}, scene);
    car_base.rotation.x = -Math.PI / 2;
    
    car_base.material = new BABYLON.StandardMaterial("Car Material", scene);
    car_base.material.diffuseTexture = new BABYLON.Texture("https://doc.babylonjs.com/img/getstarted/car.png", scene);

    // Build Wheels
    const wheels = makeWheels(scene, scale, car_base);
    return (car_base);
}

function rotateWheel()
{
    // Create Frame Data for Animation (keyframing)
    const wheelKeys = [];
    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
    frame: 0,
    value: 0,
    });
    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
    frame: 30,
    value: 2 * Math.PI,
    });

    // Create Animation by specifying property to change and its type
    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // Assign Frame Data
    animWheel.setKeys(wheelKeys);
    return (animWheel);
}

function animateWheels(wheels, scene)
{

    // Set Animation data of wheel to this Animation
    wheels[0].animations = [rotateWheel()];
    wheels[1].animations = [rotateWheel()];
    wheels[2].animations = [rotateWheel()];
    wheels[3].animations = [rotateWheel()];
    // Start Animation of wheels
    scene.beginAnimation(wheels[0], 0, 30, true);
    scene.beginAnimation(wheels[1], 0, 30, true);
    scene.beginAnimation(wheels[2], 0, 30, true);
    scene.beginAnimation(wheels[3], 0, 30, true);
}

export function createCar(scene)
{
    const scale = 4;
	const car = makeCar(scene, scale);
	const wheels = makeWheels(scene, scale, car);
    car.rotation.y = -Math.PI / 2;
	car.position.x = -1;
    car.position.z = 0.5;
    car.position.y = 0.1 * scale + (0.15 * scale / 2);

	animateWheels(wheels, scene);
}