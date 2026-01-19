export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./objects/",
    "Dimond.glb",
    scene
  );

  return scene;
}
