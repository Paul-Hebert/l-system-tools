import { parse } from "./parse";

test("handles basic parsing", () => {
  const axiom = "A";
  const productions = {
    A: { replacement: "AB" },
    B: { replacement: "BA" },
  };
  expect(parse({ axiom, productions, iterations: 1 })).toBe("AB");
  expect(parse({ axiom, productions, iterations: 2 })).toBe("ABBA");
  expect(parse({ axiom, productions, iterations: 3 })).toBe("ABBABAAB");
  expect(parse({ axiom, productions, iterations: 4 })).toBe("ABBABAABBAABABBA");
});
