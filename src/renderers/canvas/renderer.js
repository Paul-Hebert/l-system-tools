export const renderCanvas = ({
  commandString,
  canvas,
  angle = 90,
  distance = 10,
}) => {
  const ctx = canvas.getContext("2d");
  let position = { x: 400, y: 400 };
  let rotation = 180;
  let trunks = [];

  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Start our path
  ctx.beginPath();
  // Move to starting position
  ctx.moveTo(position.x, position.y);

  // Handle commands
  commandString.split("").forEach((command) => {
    if (command === "+") {
      rotation -= Number(angle);
    } else if (command === "-") {
      rotation += Number(angle);
    } else if (command === "[") {
      trunks.push({ position: { ...position }, rotation });
    } else if (command === "]") {
      const lastTrunk = trunks.pop();
      position = { ...lastTrunk.position };
      rotation = lastTrunk.rotation;
      ctx.moveTo(position.x, position.y);
    } else if (command === "F") {
      position.x += Math.sin(degreesToRadians(rotation)) * distance;
      position.y += Math.cos(degreesToRadians(rotation)) * distance;

      ctx.lineTo(position.x, position.y);
    }

    console.log(command);

    if (rotation >= 360) rotation -= 360;
  });
  ctx.stroke();
};

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
