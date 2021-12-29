export const parse = ({ seed, rules, iterations }) => {
  let tree = seed;

  for (let i = 0; i < iterations; i++) {
    tree = tree
      .split("")
      .map((char) => rules[char])
      .join("");
  }

  return tree;
};
