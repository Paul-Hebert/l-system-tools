export const renderCanvas = ({ commandString, canvas }) => {
  const ctx = canvas.getContext("2d");
  const position = { x: 0, y: 0 };

  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Start our path
  ctx.beginPath();
  // Move to starting position
  ctx.moveTo(position.x, position.y);

  // Handle commands
  commandString.split("").forEach((command) => {
    if (command === "A") {
      position.x += 10;
    } else if (command === "B") {
      position.y += 10;
    }
    ctx.lineTo(position.x, position.y);
  });
  ctx.stroke();
};
