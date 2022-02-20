import { ExperimentalSvgRenderer } from "../renderers/svg/experimental/renderer.js";
import { parse } from "../parser/parse.js";

const form = document.querySelector("form");
// const renderer = new canvasRenderer(document.querySelector("canvas"));
const renderer = new ExperimentalSvgRenderer(document.querySelector("svg"));

let ruleId = 1;

render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});

form.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.closest(".rule").remove();
  } else if (e.target.classList.contains("add")) {
    ruleId++;
    e.target.insertAdjacentHTML(
      "beforebegin",
      `
        <fieldset class="rule">
          <legend>Rules</legend>
          <label>
            Find:
            <input type="text" value="F" name="find-${ruleId}" class="find" />
          </label>
          <label>
            Replace:
            <input
              type="text"
              value="F[-F][+F]"
              name="replace-${ruleId}"
              class="replace"
            />
          </label>
          <label>
            Chance:
            <input
              type="number"
              value="1"
              name="chance-${ruleId}"
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
  const seed = document.querySelector('[name="seed"]').value;
  const angle = document.querySelector('[name="angle"]').value;
  const startRotation = document.querySelector('[name="startRotation"]').value;
  const distance = document.querySelector('[name="distance"]').value;

  const rules = {};
  document.querySelectorAll(".rule").forEach((ruleEl) => {
    rules[ruleEl.querySelector(".find").value] = {
      replacement: ruleEl.querySelector(".replace").value,
      chance: ruleEl.querySelector(".chance").value,
    };
  });

  console.log(rules);

  renderer.render({
    commandString: parse({
      seed,
      rules,
      iterations,
    }),
    startRotation,
    turnRotation: angle,
    distance,
    startPosition: { x: 400, y: 400 },
  });
}
