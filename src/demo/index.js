import { renderCanvas } from "../renderers/canvas/renderer.js";
import { parse } from "../parser/parse.js";

const form = document.querySelector("form");

render();

form.addEventListener("input", (e) => {
  render();
});

function render() {
  const iterations = document.querySelector('[name="iterations"]').value;
  const seed = document.querySelector('[name="seed"]').value;

  renderCanvas({
    canvas: document.querySelector("canvas"),
    commandString: parse({
      seed,
      rules: { A: "AB", B: "BA" },
      iterations,
    }),
  });
}
