const sum = require("./sum");
const capitalize = require('./main')

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("2 + 2 = 4", () => {
  expect(2 + 2).toBe(4);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
  expect(value).toBeCloseTo(4);
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christopher', () => {
  expect("Christopher").toMatch(/stop/);
});

const shoppingList = ["diapers", "milk", "meat", "water", "bread"];

test("the shopping list has milk", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

function compileAndoidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compilling android goes as expected", () => {

    expect(()=>compileAndoidCode().toThrow(/JDK/))
    expect(()=>compileAndoidCode().toThrow(/^you are using the wrong JDK!$/))
});


