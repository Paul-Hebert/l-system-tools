import { canvasRenderer } from "../renderer.js";

export class ExperimentalCanvasRenderer extends canvasRenderer {
  customCommand = (command) => {
    if (command === "C") {
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
