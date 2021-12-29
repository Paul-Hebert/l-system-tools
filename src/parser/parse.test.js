import { parse } from "./parse";

test("returns basic value", () => {
  expect(parse(1)).toBe(1);
});
