import { buildHouse } from "./buildHouse";

export function createVillage(scene)
{
    const origin_house = buildHouse(new BABYLON.Vector3(0, 0, 0), scene);
	let village = [];
    for (let i = -10; i < 10; i++)
    {
        village[i] = origin_house.createInstance("Copied House" + i);
        village[i].position.x = randPos();
        village[i].position.z = i * 1.4;
        village[i].rotation.y = Math.PI + randDir();
    }	

    for (let i = -10; i < 10; i++)
    {
        village[i] = origin_house.createInstance("Copied House" + i);
        village[i].position.x = randPos() + 7;
        village[i].position.z = i * 1.4;
        village[i].rotation.y = Math.PI + randDir();
    }
}