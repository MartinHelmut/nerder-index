import { get, analyse } from "./index.js";

describe("get()", () => {
  test("invalid syntax exception", () => {
    expect(() => get("+")).toThrow();
  });

  test("invalid function string exception", () => {
    expect(() => get("var a = 0;")).toThrow();
  });

  test('returns 0 (an invalid "Nerder Index") for a function with no parameters', () => {
    expect(get("function test() { return 0; }")).toBe(0);
  });

  test('returns a valid "Nerder Index" for a given function string', () => {
    expect(get("function test(a) { return a; }")).toBeGreaterThan(0);
  });
});

describe("analyse()", () => {
  test("invalid syntax exception", () => {
    expect(() => analyse("p")).toThrow();
  });

  test("invalid function string exception", () => {
    expect(() => analyse("function () { return 0; }")).toThrow();
  });

  test('returns a valid "Nerder Index"', () => {
    const result = analyse("function test(a) { return a; }");
    expect(result).toHaveProperty("nerderIndex");
  });

  test("returns a valid parameter count", () => {
    const result = analyse("function test(a) { return a; }");
    expect(result).toHaveProperty("parameterCount", 1);
  });

  test("returns a valid cyclomatic complexity", () => {
    const result = analyse("function test(a) { return a; }");
    expect(result).toHaveProperty("complexity");
  });

  test("returns a valid operator index", () => {
    const result = analyse("function test(a) { return a; }");
    expect(result).toHaveProperty("operatorIndex");
  });
});

describe("overall nerder index tests", () => {
  test("for difficulty", () => {
    const fns = [
      function fn1() {
        return 1;
      },
      function fn2(c) {
        let a = 42;
        a = (2 * a) / a - 5 + c;
        return 42 - a;
      },
      function fn3(c, d) {
        let a = 13;
        a = (2 * a) / a - d + 42;
        return a + c;
      },
      function fn4(a, b, c) {
        if (a === 0) {
          return b;
        }
        return c;
      }
    ];

    expect(get(fns[0].toString())).toBe(0);
    expect(get(fns[1].toString())).toBeCloseTo(1.25, 2);
    expect(get(fns[2].toString())).toBeCloseTo(2.5, 1);
    expect(get(fns[3].toString())).toBeCloseTo(7.5, 1);
  });
});
