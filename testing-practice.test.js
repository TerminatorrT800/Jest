const {
  capitalize,
  reverse,
  calculator,
  ceaserCipher,
  arrayAnalyzer,
} = require("./testing-practice.js");

test("Capitalize string", () => {
  expect(capitalize("letter")).toBe("Letter");
});

test("Reverse string", () => {
  expect(reverse("string")).toBe("gnirts");
});

test("Calculator", () => {
  const calc = calculator();
  expect(calc.add(1, 2)).toBe(3);
  expect(calc.subtrack(2, 1)).toBe(1);
  expect(calc.multiply(2, 5)).toBe(10);
  expect(calc.devide(2, 1)).toBe(2);
});

test("Ceaser cipher", () => {
  expect(ceaserCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("Array analyzer", () => {
  expect(arrayAnalyzer([1, 8, 3, 4, 2, 6])).toStrictEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
