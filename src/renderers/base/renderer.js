export class Renderer {
  constructor() {}

  render = ({
    commandString,
    startRotation = 90,
    turnRotation = 30,
    distance = 10,
    startPosition = { x: 50, y: 50 },
  }) => {
    // Set starting values
    this.distance = distance;
    this.position = { ...startPosition };
    this.rotation = Number(startRotation);
    this.branchingPoints = [];
    this.turnRotation = Number(turnRotation);

    // Set up the canvas
    this.clear();
    this.prep();

    // Handle commands
    commandString.split("").forEach((command) => {
      if (command === "+") {
        this.rotation -= this.turnRotation;
      } else if (command === "-") {
        this.rotation += this.turnRotation;
      } else if (command === "[") {
        this.branchingPoints.push({
          position: { ...this.position },
          rotation: this.rotation,
        });
      } else if (command === "]") {
        this.endBranchPrep();

        const lastBranchingPoint = this.branchingPoints.pop();
        this.position = { ...lastBranchingPoint.position };
        this.rotation = lastBranchingPoint.rotation;

        this.endBranchFinish();
      } else if (command === "F") {
        const lastPosition = { ...this.position };
        this.position.x +=
          Math.sin(degreesToRadians(this.rotation)) * this.distance;
        this.position.y +=
          Math.cos(degreesToRadians(this.rotation)) * this.distance;
        this.drawLine(lastPosition);
      } else {
        this.customCommand(command);
      }

      if (this.rotation >= 360) this.rotation -= 360;
    });

    this.finish();
  };

  clear = () => {};

  prep = () => {};

  finish = () => {};

  drawLine(from) {}

  endBranchPrep() {}

  endBranchFinish() {}

  customCommand() {}
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
