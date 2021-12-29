import { parse } from "./parse";

test("handles basic parsing", () => {
  const seed = "A";
  const rules = {
    A: "AB",
    B: "BA",
  };
  expect(parse({ seed, rules, iterations: 1 })).toBe("AB");
  expect(parse({ seed, rules, iterations: 2 })).toBe("ABBA");
  expect(parse({ seed, rules, iterations: 3 })).toBe("ABBABAAB");
  expect(parse({ seed, rules, iterations: 4 })).toBe("ABBABAABBAABABBA");
});
