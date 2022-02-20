import { ExperimentalSvgRenderer } from "../renderers/svg/experimental/renderer.js";
import { parse } from "../parser/parse.js";

const form = document.querySelector("form");
// const renderer = new canvasRenderer(document.querySelector("canvas"));
const renderer = new ExperimentalSvgRenderer(document.querySelector("svg"));

render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});

function render() {
  const iterations = document.querySelector('[name="iterations"]').value;
  const seed = document.querySelector('[name="seed"]').value;
  const rules = JSON.parse(document.querySelector('[name="rules"]').value);
  const angle = document.querySelector('[name="angle"]').value;
  const distance = document.querySelector('[name="distance"]').value;

  renderer.render({
    commandString: parse({
      seed,
      rules,
      iterations,
    }),
    startRotation: 180,
    turnRotation: angle,
    distance,
    startPosition: { x: 400, y: 400 },
  });
}
