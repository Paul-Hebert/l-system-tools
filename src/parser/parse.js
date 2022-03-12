export const parse = ({ axiom, productions, iterations }) => {
  let tree = axiom;

  for (let i = 0; i < iterations; i++) {
    tree = tree
      .split("")
      .map((char) => {
        const production = productions[char];
        if (!production) return char;
        if (!production.chance) return production.replacement;

        if (Math.random() <= production.chance) {
          return production.replacement;
        }

        return char;
      })
      .join("");
  }

  return tree;
};
