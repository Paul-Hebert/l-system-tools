import { renderCanvas } from "../renderers/canvas/renderer.js";
import { parse } from "../parser/parse.js";

const form = document.querySelector("form");

render();

form.addEventListener("input", () => {
  render();
});

function render() {
  const iterations = document.querySelector('[name="iterations"]').value;
  const seed = document.querySelector('[name="seed"]').value;
  const rules = JSON.parse(document.querySelector('[name="rules"]').value);
  const angle = document.querySelector('[name="angle"]').value;
  const distance = document.querySelector('[name="distance"]').value;

  renderCanvas({
    canvas: document.querySelector("canvas"),
    commandString: parse({
      seed,
      rules,
      iterations,
    }),
    angle,
    distance,
  });
}
