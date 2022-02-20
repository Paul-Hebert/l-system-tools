import { Renderer } from "../base/renderer.js";

export class canvasRenderer extends Renderer {
  constructor(canvas) {
    super();
    this.context = canvas.getContext("2d");
  }

  clear = () => {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  };

  prep = () => {
    // Start our path
    this.context.beginPath();
    // Move to starting position
    this.context.moveTo(this.position.x, this.position.y);
  };

  finish = () => {
    this.context.stroke();
  };

  drawLine = (from) => {
    this.context.lineTo(this.position.x, this.position.y);
  };

  endBranchCallback = () => {
    this.context.moveTo(this.position.x, this.position.y);
  };
}
