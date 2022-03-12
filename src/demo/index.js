import { ExperimentalSvgRenderer } from "../renderers/svg/experimental/renderer.js";
import { parse } from "../parser/parse.js";

const form = document.querySelector("form");
const codeExampleEl = document.querySelector(".js-code-example");
const commandStringEl = document.querySelector(".js-generated-string");
// const renderer = new canvasRenderer(document.querySelector("canvas"));
const renderer = new ExperimentalSvgRenderer(document.querySelector("svg"));

let productionId = 1;

render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});

form.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.closest(".production").remove();
  } else if (e.target.classList.contains("add")) {
    productionId++;
    e.target.insertAdjacentHTML(
      "beforebegin",
      `
        <fieldset class="production">
          <legend>productions</legend>
          <label>
            Find:
            <input type="text" value="F" name="find-${productionId}" class="find" />
          </label>
          <label>
            Replace:
            <input
              type="text"
              value="F[-F][+F]"
              name="replace-${productionId}"
              class="replace"
            />
          </label>
          <label>
            Chance:
            <input
              type="number"
              value="1"
              name="chance-${productionId}"
              max="1"
              min="0"
              step="0.01"
              class="chance"
            />
          </label>
          <button class="remove" type="button">Remove</button>
        </fieldset>`
    );
  }
});

function render() {
  const iterations = document.querySelector('[name="iterations"]').value;
  const axiom = document.querySelector('[name="axiom"]').value;
  const angle = document.querySelector('[name="angle"]').value;
  const startRotation = document.querySelector('[name="startRotation"]').value;
  const distance = document.querySelector('[name="distance"]').value;

  const productions = {};
  document.querySelectorAll(".production").forEach((productionEl) => {
    productions[productionEl.querySelector(".find").value] = {
      replacement: productionEl.querySelector(".replace").value,
      chance: productionEl.querySelector(".chance").value,
    };
  });

  const commandString = parse({
    axiom,
    productions,
    iterations,
  });

  commandStringEl.textContent = commandString;
  codeExampleEl.textContent = `
import { parse, svgRenderer } from "l-system";

const renderer = new svgRenderer(document.querySelector("svg"));

renderer.render({
  commandString: parse({
    axiom: "${axiom}",
    productions: ${JSON.stringify(productions)},
    iterations: ${iterations},
  });
  startRotation: ${startRotation},
  turnRotation: ${angle},
  distance: ${distance},
  startPosition: { x: 400, y: 400 },
});
  `.trim();

  renderer.render({
    commandString,
    startRotation,
    turnRotation: angle,
    distance,
    startPosition: { x: 400, y: 400 },
  });
}
