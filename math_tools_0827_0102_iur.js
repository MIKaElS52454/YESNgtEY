// 代码生成时间: 2025-08-27 01:02:11
// math_tools.js
// A math utilities module for common calculations

const mathTools = {

  // Adds two numbers
  add(x, y) {
    "use strict";
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    return x + y;
  },

  // Subtracts two numbers
  subtract(x, y) {
    "use strict";
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    return x - y;
  },

  // Multiplies two numbers
  multiply(x, y) {
    "use strict";
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    return x * y;
  },

  // Divides two numbers, handles division by zero
  divide(x, y) {
    "use strict";
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    if (y === 0) {
      throw new Error("Cannot divide by zero");
    }
    return x / y;
  },

  // Calculates the power of a number
  power(x, y) {
    "use strict";
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    return Math.pow(x, y);
  },

  // Calculates the factorial of a non-negative integer
  factorial(n) {
    "use strict";
    if (!Number.isInteger(n) || n < 0) {
      throw new Error("Argument must be a non-negative integer");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },

  // Calculates the square root of a number
  sqrt(x) {
    "use strict";
    if (typeof x !== "number" || x < 0) {
      throw new Error("Argument must be a non-negative number");
    }
    return Math.sqrt(x);
  },

  // Calculates the absolute value of a number
  abs(x) {
    "use strict";
    if (typeof x !== "number") {
      throw new Error("Argument must be a number");
    }
    return Math.abs(x);
  },

  // Calculates the greatest common divisor (GCD) of two integers
  gcd(a, b) {
    "use strict";
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error("Both arguments must be integers");
    }
    while (b != 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return Math.abs(a);
  },

  // Calculates the least common multiple (LCM) of two integers
  lcm(a, b) {
    "use strict";
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error("Both arguments must be integers");
    }
    return (a * b) / this.gcd(a, b);
  },

  // Calculates the sum of an array of numbers
  sumArray(numbers) {
    "use strict";
    if (!Array.isArray(numbers) || !numbers.every(n => typeof n === "number")) {
      throw new Error("Argument must be an array of numbers");
    }
    return numbers.reduce((sum, current) => sum + current, 0);
  },

  // Calculates the average of an array of numbers
  averageArray(numbers) {
    "use strict";
    if (!Array.isArray(numbers) || !numbers.every(n => typeof n === "number")) {
      throw new Error("Argument must be an array of numbers");
    }
    return this.sumArray(numbers) / numbers.length;
  }

};

export default mathTools;