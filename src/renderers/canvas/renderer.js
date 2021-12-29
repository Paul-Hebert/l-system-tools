export const renderCanvas = ({ commandString, canvas }) => {
  const ctx = canvas.getContext("2d");
  const position = { x: 0, y: 0 };

  ctx.beginPath();
  ctx.moveTo(position.x, position.y);
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
