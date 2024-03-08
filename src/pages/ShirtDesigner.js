import React, { useEffect, useState } from "react";
import shirtImage from "../images/shirt.png";
import flowerImage from "../images/flower1.png";
import base from "../images/base.jpeg";
import "../css/colorButton.css";

const ShirtDesigner = () => {
  const [selectedColor, setSelectedColor] = useState("transparent"); // Initially transparent
  const [flowerColor, setFlowerColor] = useState("#ff00ff");
  const [isFlowerAdded, setIsFlowerAdded] = useState(false);
  const canvasWidth = 550; // Hardcoded width
  const canvasHeight = 200; // Hardcoded height
  const flowerCanvasWidth = 300; // Hardcoded flower width
  const flowerCanvasHeight = 300; // Hardcoded flower height
  const canvasRef = React.createRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      render(ctx, img);
    };

    img.src = base;

    const render = (ctx, img) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "color-burn";
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";

      if (isFlowerAdded) {
        addFlowerToCanvas();
      }
    };

    render(ctx, img);
  }, [canvasRef, selectedColor, isFlowerAdded, canvasWidth, canvasHeight]);

  useEffect(() => {
    if (isFlowerAdded) {
      addFlowerToCanvas();
    }
  }, [canvasRef, flowerColor, isFlowerAdded]);

  const addFlowerToCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const flowerImg = new Image();

    flowerImg.onload = () => {
      const flowerCanvas = document.createElement("canvas");
      flowerCanvas.width = flowerCanvasWidth;
      flowerCanvas.height = flowerCanvasHeight;
      const flowerCtx = flowerCanvas.getContext("2d");

      // Draw flower image with applied color on the off-screen canvas
      flowerCtx.drawImage(flowerImg, 0, 0);
      flowerCtx.globalCompositeOperation = "source-in";
      flowerCtx.fillStyle = flowerColor;
      flowerCtx.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);

      // Composite the flower canvas onto the main canvas
      ctx.drawImage(
        flowerCanvas,
        (canvas.width - flowerCanvas.width) / 2,
        (canvas.height - flowerCanvas.height) / 2
      );

      // Reset comp. mode to default
      flowerCtx.globalCompositeOperation = "source-over";
    };

    flowerImg.src = flowerImage;
  };

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const changeFlowerColor = (color) => {
    setFlowerColor(color);
  };

  const addFlower = () => {
    setIsFlowerAdded(true);
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>

      <div>
        <label>
          Selected Color For Base Layer: <span>{selectedColor}</span>
        </label>
        <div
          className="colorButton"
          style={{ backgroundColor: "#00ff00" }}
          onClick={() => changeColor("#00ff00")}
        ></div>
        <div
          className="colorButton"
          style={{ backgroundColor: "#0000ff" }}
          onClick={() => changeColor("#0000ff")}
        ></div>
      </div>
      <div>
        <label>
          Selected Color For First Layer: <span>{flowerColor}</span>
        </label>
        <div
          className="colorButton"
          style={{ backgroundColor: "#ff00ff" }}
          onClick={() => changeFlowerColor("#ff00ff")}
        ></div>
        <div
          className="colorButton"
          style={{ backgroundColor: "#00ffff" }}
          onClick={() => changeFlowerColor("#00ffff")}
        ></div>
      </div>
      <button onClick={addFlower}>Add Flower</button>
    </div>
  );
};

export default ShirtDesigner;
