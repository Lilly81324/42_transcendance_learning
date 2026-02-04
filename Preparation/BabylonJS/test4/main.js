import { createScene } from "./createScene.js";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const scene = createScene(engine, canvas); //Call the createScene function

// Add Havoc Phys Engine and Gravity to scene
const havokInstance = await HavokPhysics();
const hk = new BABYLON.HavokPlugin(true, havokInstance);
scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

      // Give Ground Map Box Colisions
      const sphereAggregate = new BABYLON.PhysicsAggregate(scene.meshes[1], BABYLON.PhysicsShapeType.BOX, { mass: 1, restitution: 0.75 }, scene);

      // Ground just in case
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 12}, scene);
      ground.position.y = -1.5;
      const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});