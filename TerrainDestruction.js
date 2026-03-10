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
function checkIntersection(point1, point2, exploPoint, radius, tolerance)
{
	// Calculate helper values
	const V = Vector.sub(point2, point1);
	const D = Vector.sub(point1, exploPoint);

	// Get values for midnight formula
	const a = Vector.dotproduct(V, V);
	const b = Vector.dotproduct(V, D) * 2;
	const c = Vector.dotproduct(D, D) - radius * radius;

	const discriminant = b * b -4 * a * c;

	if (discriminant < 0) return [];

	// Insert into midnight formula
	const sqrtofDic = Math.sqrt(b*b - 4 * a * c)

	const fact1 = (-b + sqrtofDic)/(2 * a);
	const fact2 = (-b - sqrtofDic)/(2 * a);

	const results = [];
	// Generously provided by AI
	const sortedFactors = [fact1, fact2].sort((x, y) => x - y);
	for (let factor of sortedFactors) {
		if (factor >= -tolerance && factor <= 1 + tolerance) {
			const clampedFactor = Math.max(0, Math.min(1, factor));
			results.push(Vector.mult(V, clampedFactor).add(point1));
		}
	}
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
 * @note Needs special behaviour, if we start moving along edges inside the explosion
 */
function redoArray(array, explosionX, explosionY, radius) {
	const explosionPoint = new Vector(explosionX, explosionY);
	const len = array.length;
	let startIndex = -1;
	
	// Find point that is outside the explosion to keep walking through array
	for (let i = 0; i < len; i++) {
		if (!insideExploCheck(array[i].x, array[i].z, explosionPoint, radius)) {
			startIndex = i;
			break ;
		}
	}
	
	// Explosion consumes entire mesh
	if (startIndex == -1) {
		return [];
	}
	
	const newArray = [];
	let insideExplosion = false;

	// Go through all Vectors that make up the map
	for (let i = 0; i < len; i++) {
		const currentIndex = (startIndex + i) % len;
		const nextIndex = (startIndex + i + 1) % len;

		const point1 = new Vector(array[currentIndex].x, array[currentIndex].z);
		const point2 = new Vector(array[nextIndex].x, array[nextIndex].z);
		console.log("Going through points: P1: " + point1.x + ",", + point1.y + " P2: " + point2.x + ", ", + point2.y);
		const intersectPoints = checkIntersection(point1, point2, explosionPoint, radius, 0.00001);

		if (!insideExplosion) {
			newArray.push(new BABYLON.Vector3(point1.x, 0, point1.y));
			if (intersectPoints.length == 1) {
				console.log("Entering");
				insideExplosion = true;
				newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
			}
			else if (intersectPoints.length === 2) {
				console.log("Entering and Exiting");
				newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
				onExitingExplo(newArray, intersectPoints[1]);
			}
		}
		else if (intersectPoints.length == 1) {
				console.log("Exiting");
				insideExplosion = false;
				onExitingExplo(newArray, intersectPoints[0]);
		}
	}
	return (newArray);
}
