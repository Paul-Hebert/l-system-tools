export const renderCanvas = ({
  commandString,
  canvas,
  angle = 90,
  distance = 10,
}) => {
  const ctx = canvas.getContext("2d");
  const position = { x: 0, y: 0 };
  let rotation = 90;

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
    } else if (command === "F") {
      position.x += Math.sin(degreesToRadians(rotation)) * distance;
      position.y += Math.cos(degreesToRadians(rotation)) * distance;

      ctx.lineTo(position.x, position.y);
    }

    if (rotation >= 360) rotation -= 360;
  });
  ctx.stroke();
};

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
