import { SvgRenderer } from "../renderer.js";

export class ExperimentalSvgRenderer extends SvgRenderer {
  customCommand = (command) => {
    if (command === "C") {
      this.markup += `
        <circle
          cx="${this.position.x}" 
          cy="${this.position.y}" 
          r="${this.distance / 5}"
        />`;
    }
  };
}
