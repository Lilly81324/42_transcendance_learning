/** Class that allows Vector Math
 * - Currently supports Multiplication, Addition, Subtraction and Dot Product
 * - Supports member functions, which change the Objects value,
 *   and return itself,
 *   as well as static functionality for multiplying vectors without changing them
 * Example Usage:
 * const vect1 = new Vector(2, 5.1);
 * const vect2 = new Vector(3, 7);
 * console.log(vect1.add(vect2));
*/ 
export class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	};

// Member methods =======================================

	/**
	 * @param input number
	 * @note Modifies existing vector
	 * @returns Vector of the resulting operation
	 */
	mult(input) {
		this.x *= input;
		this.y *= input;
		return (this);
	}
	
	/**
	 * @param input Vector
	 * @note Modifies existing vector
	 * @returns Vector of the resulting operation
	*/
	add(input) {
		this.x += input.x;
		this.y += input.y;
		return (this);
	}
	
	/**
	 * @param input Vector
	 * @note Modifies existing vector
	 * @returns Vector of the resulting operation
	*/
	sub(input) {
		this.x -= input.x;
		this.y -= input.y;
		return (this);
	}

	/**
	 * @param input Vector
	 * @returns number representing the dot product of input
	 */
	dotproduct(input) {
		return (this.x * input.x + this.y * input.y);
	}

	/**
	 * @param input Vector
	 * @returns number representing the cross product of input with this vector
	 */
	crossproduct(input) {
		return (this.x * input.y - this.y * input.x);
	}

	/**
	 * raw angle formula derived from https://wumbo.net/formulas/angle-between-two-vectors-2d/
	 * Uses vector(0, 1) to compare against
	 * @returns Angle in radians, 0 meaning straight up, increasing angle turns clockwise
	*/
	angle() {
		const raw_angle = Math.atan2(this.x, this.y);
		const adjusted_angle = ((Math.PI * 2) - raw_angle) % (Math.PI * 2)
		return (adjusted_angle);
	}
	
	/**
	 * @returns Length of Vector by using Pythagorean theorem
	*/
	length() {
		return (Math.sqrt(this.x *this.x + this.y * this.y));
	}
	
// Static methods =======================================
	
	/**
	 * @notes Takes 1 Vector, 1 number, either position
	 * @returns Vector of the resulting operation
	 */
	static mult(input1, input2) {
		if (typeof input1 == "number" && typeof input2 == "object" && input2.constructor.name == "Vector")
			return (new Vector(input2.x * input1, input2.y * input1));
		else if (typeof input2 == "number" && typeof input1 == "object" && input1.constructor.name == "Vector")
			return (new Vector(input1.x * input2, input1.y * input2));
		return (new Vector());
	}

	/**
	 * @note Takes 2 Vectors
	 * @returns Vector of the resulting operation
	 */
	static add(input1, input2) {
		return (new Vector(input1.x + input2.x, input1.y + input2.y));
	}
	
	/**
	 * @note Takes 2 Vectors
	 * @returns Vector of the resulting operation
	 */
	static sub(input1, input2) {
		return (new Vector(input1.x - input2.x, input1.y - input2.y));
	}

	/**
	 * @note Takes 2 Vectors
	 * @returns number representing the dot product of input
	 */
	static dotproduct(input1, input2) {
		return (input1.x * input2.x + input1.y * input2.y);
	}

	/**
	 * @note Takes 2 Vectors
	 * @returns number representing the cross product of input
	 */
	static crossproduct(input1, input2) {
		return (input1.x * input2.y - input1.y * input2.x);
	}

	/**
	 * raw angle formula derived from https://wumbo.net/formulas/angle-between-two-vectors-2d/
	 * Uses vector(0, 1) to compare against
	 * @param Vector
	 * @returns Angle in radians, 0 meaning straight up, increasing angle turns clockwise
	*/
	static angle(target) {
		const raw_angle = Math.atan2(target.x, target.y);
		const adjusted_angle = ((Math.PI * 2) - raw_angle) % (Math.PI * 2)
		return (adjusted_angle);
	}
	
	/**
	 * @param input Vector
	 * @returns Length of Vector by using Pythagorean theorem
	*/
	static length(input) {
		return (Math.sqrt(input.x *input.x + input.y * input.y));
	}
}


