export const parse = ({ seed, rules, iterations }) => {
  let tree = seed;

  for (let i = 0; i < iterations; i++) {
    let words = tree.split("");
    tree = "";

    words.forEach((word) => {
      tree += rules[word];
    });
  }

  return tree;
};
