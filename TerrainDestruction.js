import Vector from "./Vector.js";

// For more details on this calculation, look at "Notes Circle Line Intersection.txt"
/**
 * @param point1 Vector to start point of line
 * @param point2 Vector to end point of line
 * @param 
 */
function checkIntersection(point1, point2, exploPoint, radius)
{
	// Calculate helper values
	const V = Vector.sub(point2, point1);
	const D = Vector.sub(point1, exploPoint);

	// Get values for midnight formula
	const a = Vector.dotproduct(V, V);
	const b = Vector.dotproduct(V, D) * 2;
	const c = Vector.dotproduct(D, D) - radius * radius;

	// Insert into midnight formula
	const result1 = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);
	const result2 = (-b - Math.sqrt(b*b - 4*a*c))/(2*a);

	// If more or less then 0-1 * vector, then its not in range
	const results = [];
	if (result1 >= 0 && result1 <= 1)
		results.push(Vector.mult(V, result1));
	if (result2 >= 0 && result2 <= 1)
	    results.push(Vector.mult(V, result2));
	return (results);
}

export class TerrainDestruction {
	// Go through each vector in the array, get the points of contact
	/**
	 * @param araray Array of Babylon.Vector3 representing the structure of the Game Grid
	 * @warning When reffering to the Arrays non-x coordinate, you need to use the z coordinate
	 */
	redo(array, explosionX, explosionY, radius) {
		const explosionPoint = new Vector(explosionX, explosionY);
		// Go through all Vectors that make up the map
		for (let i = 0; i < array.length; i++) {
			const point1 = new Vector(array[i].x, array[i].z);
			var point2;
			if (i + 1 >= array.length)
				point2 = new Vector(array[0].x, array[0].z);
			else
				point2 = new Vector(array[i + 1].x, array[i + 1].z);
			const intersectPoints = checkIntersection(point1, point2, explosionPoint, radius);
			for (let j = 0; j < intersectPoints.length; j++) {
				const marker = BABYLON.MeshBuilder.CreateBox("marker", {height:6, width: 0.1, depth: 0.2}, scene);
				marker.position.x = intersectPoints[j].x;
			}
			
		}
	}
}