import { Vector } from "./Vector.js";

// Go through each vector in the array, get the points of contact
export class DestructibleGround {
	/**
	 * @param araray Array of Babylon.Vector3 representing the structure of the Game Grid
	 * @param bool wether debug outout should be printed on console
	 * @param explosionX number for x coordinate of explosion
	 * @param explosionY number for y coordinate of explosion
	 * @param raiuds number for radius of explosion
	 * @warning When reffering to the Arrays non-x coordinate, you need to use the z coordinate
	 */
	constructor(scene, debug = false, initialArray = [], depth = 1, name = "ground") {
		this.scene = scene;
		this.array = initialArray;
		this.depth = depth;
		this.name = name;
		this.debug = debug;
		if (this.array.length > 0) {	
			this.groundMesh = BABYLON.MeshBuilder.ExtrudePolygon(this.name, {shape: this.array, depth: this.depth}, this.scene);
			this.groundMesh.rotation.x = -Math.PI / 2;
			this.groundMesh.position = new BABYLON.Vector3(0, 0, -this.depth / 2);
			this.groundMesh.physicsAggregate = new BABYLON.PhysicsAggregate(this.groundMesh, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, this.scene);
		}
		else
			this.groundMesh = null;
	}


	/**
	 * @brief Register an explosion and recalculate array and mesh
	 * @param explosionX number x coordinate of explosion center
	 * @param explosionY number y coordinate of explosion center
	 * @param radius number radius of the explosion
	 */
	affectTerrain(explosionX, explosionY, radius) {
		const array = this.array;
		const explosionPoint = new Vector(explosionX, explosionY);
		const len = array.length;
		let startIndex = -1;
		
		// Find point that is outside the explosion to keep walking through array
		for (let i = 0; i < len; i++) {
			if (!this.insideExploCheck(array[i].x, array[i].z, explosionPoint, radius)) {
				startIndex = i;
				break ;
			}
		}
		
		// Explosion consumes entire mesh
		if (startIndex == -1) {
			this.makeGround();
			return ;
		}
		
		const newArray = [];
		let insideExplosion = false;

		// Go through all Vectors that make up the map
		for (let i = 0; i < len; i++) {
			const currentIndex = (startIndex + i) % len;
			const nextIndex = (startIndex + i + 1) % len;

			const point1 = new Vector(array[currentIndex].x, array[currentIndex].z);
			const point2 = new Vector(array[nextIndex].x, array[nextIndex].z);
			const intersectPoints = this.checkIntersection(point1, point2, explosionPoint, radius, 0.00001);

			if (!insideExplosion) {
				newArray.push(new BABYLON.Vector3(point1.x, 0, point1.y));
				if (intersectPoints.length == 1) {
					insideExplosion = true;
					newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
				}
				else if (intersectPoints.length === 2) {
					newArray.push(new BABYLON.Vector3(intersectPoints[0].x, 0, intersectPoints[0].y));
					this.onExitingExplo(newArray, explosionPoint, intersectPoints[1], radius);
				}
			}
			else if (intersectPoints.length == 1) {
					insideExplosion = false;
					this.onExitingExplo(newArray, explosionPoint, intersectPoints[0], radius);
			}
		}
		this.makeGround(newArray);
	}


	/**
	 * @brief Create new ground mesh based on given array
	 * @param newArray Array of BABYLON.Vector3 representing the points along the curve of the mesh
	 */
	makeGround(newArray) {
		// Get rid of old ground mesh
		if (this.groundMesh != null) {
			this.groundMesh.dispose();
			this.groundMesh = null;
		}

		// Use new Array
		if (newArray != undefined)
			this.array = newArray;
		
		// For empty arrays dont create a mesh
		if (this.array.length == 0)
			return ;

		// Move counter clockwise, building mesh from array
		this.groundMesh = BABYLON.MeshBuilder.ExtrudePolygon(this.name, {shape: this.array, depth: this.depth}, this.scene);
		this.groundMesh.rotation.x = -Math.PI / 2;
		this.groundMesh.position = new BABYLON.Vector3(0, 0, -this.depth / 2);
		this.groundMesh.physicsAggregate = new BABYLON.PhysicsAggregate(this.groundMesh, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, this.scene);
	}


	/**
	* @brief Fills newArray with points along curved surface
	* @param newArray Array of BABYLON.Vector3 that represents the new map, last entry should be the point where the explosion begins
	* @param explostionPoint Vector to where explosion is
	* @param exitPoint Vector with coordinates, where line exits explosion
	* @param radius number for radius of explosion
	*/
	onExitingExplo(newArray, explosionPoint, exitPoint, radius) {
		// Prepare vectors for crossproduct
		const entryPoint = new Vector(newArray[newArray.length - 1].x, newArray[newArray.length - 1].z);
		const line = Vector.sub(exitPoint, entryPoint);
		const exploToEntry = Vector.sub(entryPoint, explosionPoint);
		const exploToExit = Vector.sub(exitPoint, explosionPoint);

		//
		// Get angles of entrance and middle point
		const tessalationCount = 6;
		const startAngle = exploToEntry.angle();
		const endAngle = exploToExit.angle();
		const angleDiff = endAngle - startAngle;
		if (this.debug) console.log("Start at: ", startAngle / Math.PI * 180);
		if (this.debug) console.log("End at: ", endAngle / Math.PI * 180);
		if (this.debug) console.log("Diff at: ", angleDiff / Math.PI * 180);

		// Divide the shortest path by the steps
		const angleEachStep = angleDiff  / (tessalationCount);
		if (this.debug) console.log("Each step we go: ", (angleEachStep / Math.PI) * 180)

		// Walk along explosions surface, putting tesselationCount points into the newArray
		for (let i = 1; i < tessalationCount; i++) {
			const angle = (startAngle + angleEachStep * i) % (Math.PI * 2);
			if (this.debug) console.log("For angle ", (angle) / Math.PI * 180);
			// console.log("X Axis diff ", -Math.sin(initialAngleOffset + angleEachStep * i));
			// console.log("Y Axis diff ", Math.cos(initialAngleOffset + angleEachStep * i));s
			newArray.push(new BABYLON.Vector3(
				-Math.sin(angle) * radius + explosionPoint.x,
				0, 
				Math.cos(angle) * radius + explosionPoint.y
			));
		}
		newArray.push(new BABYLON.Vector3(exitPoint.x, 0, exitPoint.y));
	}


	/**
	 * @brief Quickly check, if the given point is inside the Explosion
	 * @param firstX number for x coordinate of point
	 * @param firstY number for y coordinate of point
	 * @param explosionPoint Vector representing center point of explosion
	 * @param radius number for radius of explosion
	 * @returns true if point is inside explosion, false otherwise
	 */
	insideExploCheck(firstX, firstY, explosionPoint, radius) {
		const point1 = new Vector(firstX, firstY);
		point1.sub(explosionPoint);
		if (point1.length() <= radius)
			return (true);
		return (false);
	}

	/**
	 * @brief Check where line intersects circle
	 * @param point1 Vector to start point of line
	 * @param point2 Vector to end point of line
	 * @param exploPoint Vector to point of center of circle
	 * @param radius number representing size of circle
	 * @returns Array of 0-2 Vectors pointing to Intersection points of circle and line
	 * @note For more details on this calculation, look at "Notes Circle Line Intersection.txt"
	 */
	checkIntersection(point1, point2, exploPoint, radius, tolerance) {
		// Calculate helper values
		const V = Vector.sub(point2, point1);
		const D = Vector.sub(point1, exploPoint);

		// Get values for midnight formula
		const a = Vector.dotproduct(V, V);
		const b = Vector.dotproduct(V, D) * 2;
		const c = Vector.dotproduct(D, D) - radius * radius;

		// Provided by AI, supposedly helps with edge cases
		const discriminant = b * b -4 * a * c;
		if (discriminant < 0) return [];

		// Insert into midnight formula
		const sqrtofDisc = Math.sqrt(b*b - 4 * a * c)
		const fact1 = (-b + sqrtofDisc)/(2 * a);
		const fact2 = (-b - sqrtofDisc)/(2 * a);

		// Take intersection fractions, turn them into points, and put them in an array
		const results = [];
		const sortedFactors = [fact1, fact2].sort((x, y) => x - y);
		for (let factor of sortedFactors) {
			if (factor >= -tolerance && factor <= 1 + tolerance) {
				const clampedFactor = Math.max(0, Math.min(1, factor));
				results.push(Vector.mult(V, clampedFactor).add(point1));
			}
		}
		return (results);
	}
}