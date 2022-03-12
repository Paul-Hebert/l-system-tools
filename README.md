# L System Tools

This is a JavaScript-based implementation of [Lindenmayer systems](https://en.wikipedia.org/wiki/l-system).

It consists of two key pieces:

- A parse function that takes an axiom and a set of production rules, and returns a generated command string.
- A number of different renderers that take a command string and output graphics. The renderers use a class-based system that allows them to be extended with custom graphics rules. Renderers are provided for canvas and SVG (though the base renderer could be extended for other uses.)

## Installation

```zsh
npm i l-system-tools
```

## Parse Function

The core concept of L systems is that you can take a starting string (an axiom) and iteratively replace characters in that string following a set of production rules. This outputs a longer, generated string composed of repeating patterns that mimic natural, organic structures.

Here's an example of using the parser:

```js
import { parse } from "l-system-tools";

const commandString = parse({
  // Starting string
  axiom: "F",
  // Object containing production rules
  production_rules: {
    // The character to replace
    F: {
      // What to replace the character with
      replacement: "F[-F][+F]",
      // Optionally include a decimal chance of the rule applying
      chance: "1",
    },
  },
  // How many times to iterate over the string
  iterations: 2,
});
```

This would output the following command string:

```
F[-F][+F][-F[-F][+F]][+F[-F][+F]]
```

## Renderers

The renderer takes a command string and outputs graphics. There are currently three main renderers:

- `Renderer` — A base renderer. Does not actually output graphics. (Contains core functionality that can be extended for various graphic outputs.)
- `SvgRenderer` — Renders a command string's output to an existing SVG element
- `CanvasRenderer` — Renders a command string's output to an existing canvas element.

### Using the SVG Renderer

Here's an example of using the SVG renderer:

```js
import { parse, SvgRenderer } from 'l-system-tools';

// The renderer expects to be passed an SVG element when initialized
const renderer = new SvgRenderer(document.querySelector("svg"));

renderer.render({
  commandString: parse({
    axiom: "F",
    productions: {
      F: {
        replacement: "F[-F][+F]"
      }
    },
    iterations: 2,
  });
  // Optionally define a starting rotation (determines starting direction)
  // Defaults to 90 (degrees)
  startRotation: 90,
  // Optionally define a rotation for how far to turn when a turn command is encountered
  // Defaults to 30 (degrees)
  turnRotation: 30,
  // Optionally define a distance to move when a forward command is encountered
  // Defaults to 10
  distance: 10,
  // Optionally define a starting poition
  // Defaults to { x: 50, y: 50 }
  startPosition: { x: 50, y: 50 },
});
```

### Using the Canvas Renderer

The canvas renderer has the same syntax, but takes a canvas element instead of an SVG.

```js
import { parse, CanvasRenderer } from "l-system-tools";

// The renderer expects to be passed an SVG element when initialized
const renderer = new CanvasRenderer(document.querySelector("canvas"));

renderer.render({
  // The Canvas Renderer takes the same options as the SVG Renderer above
});
```

### Extending Renderers

Any of the renderers can be extended to add additional functionality or styles. Here's an example of extending the SVG renderer to add a special rendering rule for the letter 'C':

```js
import { SvgRenderer } from "../renderer.js";

export class ExperimentalSvgRenderer extends SvgRenderer {
  customCommand = (command) => {
    if (command === "C") {
      // The SVG renderer builds a `markup` string containing the SVG markup
      this.markup += `
        <circle
          cx="${this.position.x}" 
          cy="${this.position.y}" 
          r="${this.distance / 5}"
        />`;
    }
  };
}
```

Here's a similar example for the canvas Renderer:

```js
import { canvasRenderer } from "../renderer.js";

export class ExperimentalCanvasRenderer extends canvasRenderer {
  customCommand = (command) => {
    if (command === "C") {
      // Canvas renderers expose a canvas 2d context property.
      this.context.arc(
        this.position.x,
        this.position.y,
        this.distance / 5,
        0,
        2 * Math.PI,
        false
      );
    }
  };
}
```

For further information about extending renderers I recommend you review the source code and see how the SVG Renderer and Canvas Renderer are coded.
