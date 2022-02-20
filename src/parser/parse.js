export const parse = ({ seed, rules, iterations }) => {
  let tree = seed;

  for (let i = 0; i < iterations; i++) {
    tree = tree
      .split("")
      .map((char) => {
        const rule = rules[char];
        if (!rule) return char;
        if (!rule.chance) return rule.replacement;

        if (Math.random() <= rule.chance) {
          return rule.replacement;
        }

        return char;
      })
      .join("");
  }

  return tree;
};
