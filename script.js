const display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function delChar() {
  display.value = display.value.slice(0, -1);
}

// Factorial function
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// Convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculate() {
  try {
    let expr = display.value;

    // Replace ^ with ** for exponentiation
    expr = expr.replace(/\^/g, "**");

    // Replace trigonometric functions with Math. equivalents using degrees to radians
    expr = expr.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(toRadians(${angle}))`);
    expr = expr.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(toRadians(${angle}))`);
    expr = expr.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(toRadians(${angle}))`);

    // Optional: inverse trig (still in radians, so leave as-is)
    expr = expr.replace(/asin\(/g, "Math.asin(");
    expr = expr.replace(/acos\(/g, "Math.acos(");
    expr = expr.replace(/atan\(/g, "Math.atan(");

    // Replace other math functions
    expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
    expr = expr.replace(/cbrt\(/g, "Math.cbrt(");

    // Replace constants like π
    expr = expr.replace(/π/g, "Math.PI");

    // Replace factorial(n)
    expr = expr.replace(/factorial\(([^)]+)\)/g, (_, num) => factorial(Number(num)));

    // Add toRadians to global scope using Function constructor
    const result = Function("toRadians", '"use strict"; return (' + expr + ')')(toRadians);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
