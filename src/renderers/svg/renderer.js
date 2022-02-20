import { Renderer } from "../base/renderer.js";

export class svgRenderer extends Renderer {
  constructor(svg) {
    super();
    this.svg = svg;
  }

  clear = () => {
    this.svg.innerHTML = "";
  };

  drawLine = (from) => {
    this.svg.innerHTML += `
      <line
        x1="${from.x}" 
        y1="${from.y}" 
        x2="${this.position.x}" 
        y2="${this.position.y}" 
        stroke="black" 
        fill="none"
      />
      `;
  };

  endBranchPrep = () => {
    this.svg.innerHTML += `
      <circle
        cx="${this.position.x}" 
        cy="${this.position.y}" 
        r="${this.distance / 5}"
      />`;
  };
}
