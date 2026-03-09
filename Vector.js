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
		if (typeof x == "number" && typeof y == "number") {
			this.x = x;
			this.y = y;
		}
	};

	// Accept number
	mult(input) {
		if (typeof input == "number") {
			this.x *= input;
			this.y *= input;
		}
		return (this);
	}

	// Accepts Vector to produce Dot Product
	dotproduct(input)
	{
		if (typeof input == "object" && input.constructor.name == "Vector") {
			return (this.x * input.x + this.y * input.y);
		}
		return (0);
	}

	// Accept other Vector
	add(input) {
		if (typeof input == "object" && input.constructor.name == "Vector") {
			this.x += input.x;
			this.y += input.y;
		}
		return (this);
	}

	// Accept other Vector
	sub(input) {
		if (typeof input == "object" && input.constructor.name == "Vector") {
			this.x -= input.x;
			this.y -= input.y;
		}
		return (this);
	}

	// Accept 1 vector and 1 number
	static mult(input1, input2) {
		if (typeof input1 == "number" && typeof input2 == "object" && input2.constructor.name == "Vector")
			return (new Vector(input2.x * input1, input2.y * input1));
		else if (typeof input2 == "number" && typeof input1 == "object" && input1.constructor.name == "Vector")
			return (new Vector(input1.x * input2, input1.y * input2));
		return (new Vector());
	}

	static dotproduct(input1, input2)
	{
		if (typeof input1 == "object" && input1.constructor.name == "Vector" && typeof input2 == "object" && input2.constructor.name == "Vector") {
			return (input1.x * input2.x + input1.y * input2.y);
		}
		return (0);
	}

	// Accept 2 Vectors
	static add(input1, input2) {
		if (typeof input1 == "object" && input1.constructor.name == "Vector" && typeof input2 == "object" && input2.constructor.name == "Vector")
			return (new Vector(input1.x + input2.x, input1.y + input2.y));
		return (new Vector());
	}

	// Accept 2 Vectors
	static sub(input1, input2) {
		if (typeof input1 == "object" && input1.constructor.name == "Vector" && typeof input2 == "object" && input2.constructor.name == "Vector")
			return (new Vector(input1.x - input2.x, input1.y - input2.y));
		return (new Vector());
	}
}