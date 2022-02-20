import { Renderer } from "../base/renderer.js";

export class SvgRenderer extends Renderer {
  constructor(svg) {
    super();
    this.svg = svg;
    this.markup = "";
  }

  clear = () => {
    this.markup = "";
  };

  finish = () => {
    this.svg.innerHTML = this.markup;
  };

  drawLine = (from) => {
    this.markup += `
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
}
