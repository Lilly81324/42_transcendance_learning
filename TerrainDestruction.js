import Vector from "./Vector.js";

// For more details on this calculation, look at "Notes Circle Line Intersection.txt"
/**
 * @brief Check where line intersects explosion
 * @param point1 Vector to start point of line
 * @param point2 Vector to end point of line
 * @param exploPoint Vector to point of center of explosion
 * @param radius number representing size of explosion
 * @returns Array of 0-2 Vectors pointing to Intersection points of explosion and point1->2 vector 
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
		results.push(Vector.mult(V, result1).add(point1));
	if (result2 >= 0 && result2 <= 1)
		results.push(Vector.mult(V, result2).add(point1));
	return (results);
}


/**
 * @brief Quickly check, if the given point is inside the Explosion
 * @param firstX number for x coordinate of point
 * @param firstY number for y coordinate of point
 * @param explosionPoint Vector representing center point of explosion
 * @param radius number for radius of explosion
 * @returns true if point is inside explosion, false otherwise
 */
function insideExploCheck(firstX, firstY, explosionPoint, radius) {
	const point1 = new Vector(firstX, firstY);
	point1.sub(explosionPoint);
	if (point1.length() <= radius)
		return (true);
	return (false);
}

/**
 * @param newArray Array of BABYLON.Vector3 that represents the new map, last entry should be the point where the explosion begins
 * @param existPosition Vector with coordinates, where explosion exits
 */
function onExitingExplo(newArray, exitPosition) {
	const lastVector = newArray[newArray.length - 1];
	const midPoint = new BABYLON.Vector3((exitPosition.x + lastVector.x) / 2, (exitPosition.y + lastVector.z) / 2 - 1);
	console.log("Middle point at: ", exitPosition.y , lastVector.z,  (exitPosition.y + lastVector.z) / 2 - 1 );
	newArray.push(midPoint);
	newArray.push(new BABYLON.Vector3(exitPosition.x, 0, exitPosition.y));
}

// Go through each vector in the array, get the points of contact
/**
 * @param araray Array of Babylon.Vector3 representing the structure of the Game Grid
 * @warning When reffering to the Arrays non-x coordinate, you need to use the z coordinate
 */
function redoArray(array, explosionX, explosionY, radius) {
	const explosionPoint = new Vector(explosionX, explosionY);
	const newArray = [];
	let insideExplosion = insideExploCheck(array[0].x, array[0].y, explosionPoint, radius)
	// Go through all Vectors that make up the map
	for (let i = 0; i < array.length; i++) {
		const point1 = new Vector(array[i].x, array[i].z);
		var point2;
		if (i + 1 >= array.length)
			point2 = new Vector(array[0].x, array[0].z);
		else
			point2 = new Vector(array[i + 1].x, array[i + 1].z);
		const intersectPoints = checkIntersection(point1, point2, explosionPoint, radius);
		// Needs special case, in case we start inside the explosion
		if (insideExplosion) {
			if (intersectPoints.length == 0)
				continue ;
			else if (intersectPoints.length == 1) {
				// exiting
				onExitingExplo(newArray, intersectPoints[0]);
				insideExplosion = false;
				console.log("Case 1 - Exiting - " + point1.x + "/" + point1.y);
			}
			else {
				console.log("ERROR: Terrain Manipulation Logic failed. Straight line somehow crosses circle 3 times.");
				console.log("Case 2 - Exiting Entering - " + point1.x + "/" + point1.y);
				return (array);
			}
		}
		else {
			if (intersectPoints.length == 0) {
				newArray.push(new BABYLON.Vector3(point1.x, 0, point1.y));
				console.log("Case 3 - Passing - " + point1.x + "/" + point1.y);
			}
			else if (intersectPoints.length == 1) {
				insideExplosion = true;
				newArray.push(new BABYLON.Vector3(point1.x, 0, point1.y));
				newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
				console.log("Case 4 - Entering - " + point1.x + "/" + point1.y);
			}
			else {
				newArray.push(new BABYLON.Vector3(point1.x, 0, point1.y));
				newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
				onExitingExplo(newArray, intersectPoints[1]);
				console.log("Case 5 - Entering Exiting - " + point1.x + "/" + point1.y);
			}
		}
	}
	return (newArray);
}
