import { buildHouse } from "./buildHouse.js";

export function createVillage(scene)
{
    const origin_house = buildHouse(new BABYLON.Vector3(0, 0, 0), scene);
	let village = [];
    for (let i = 0; i < 20; i++)
    {
        village[i] = origin_house.createInstance("Copied House" + i);
        village[i].position.x = rand(-3.5, 0.3);
        village[i].rotation.y = 0;
        village[i].position.z = (i - 10) * 1.4;
        village[i].rotation.y = Math.PI * rand(0, 0.05);
    }	

    for (let i = 20; i < 40; i++)
    {
        village[i] = origin_house.createInstance("Copied House" + (i + 20));
        village[i].position.x = rand(3.5, 0.4);
        village[i].position.z = (i - 30) * 1.4;
        village[i].rotation.y = Math.PI * rand(0, 0.1);
    }
}

/**
 * 
 * @param {int} base Starting Value to deviate from
 * @param {int} scaling Amount to deviate into + or -
 * @returns Something between [base + scaling] and [base - scaling]
 */
function rand(base, scaling)
{
    let choice = Math.random() > 0.5 ? 1 : -1;
    return (base + choice * scaling * Math.random())
}