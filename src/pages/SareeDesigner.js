import React, { useEffect, useState } from "react";
import base from "../images/base.jpeg";
import layer1 from "../images/layer2.png";
import layer2 from "../images/layer3.png";
import "../css/colorButton.css";
import Button from "react-bootstrap/Button";

const SareeDesigner = () => {
  const [selectedColor, setSelectedColor] = useState("transparent"); // Initially transparent
  const [flowerColor, setFlowerColor] = useState("red");
  const [isFlowerAdded, setIsFlowerAdded] = useState(false);
  const [addLayer, setAddLayer] = useState(false);
  const canvasWidth = 550; // Hardcoded width
  const canvasHeight = 200; // Hardcoded height
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
        addFlowerToCanvas(canvas.width, canvas.height); // Pass canvas dimensions
      }
    };

    render(ctx, img);
  }, [canvasRef, selectedColor, isFlowerAdded, canvasWidth, canvasHeight]);

  const addFlowerToCanvas = (canvasWidth, canvasHeight) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const flowerImg = new Image();

    flowerImg.onload = () => {
      const flowerCanvas = document.createElement("canvas");
      flowerCanvas.width = canvasWidth; // Match main canvas width
      flowerCanvas.height = canvasHeight; // Match main canvas height
      const flowerCtx = flowerCanvas.getContext("2d");

      // Draw flower image with applied color on the off-screen canvas
      flowerCtx.drawImage(flowerImg, 0, 0, canvasWidth, canvasHeight);
      flowerCtx.globalCompositeOperation = "source-in";
      flowerCtx.fillStyle = flowerColor;
      flowerCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Composite the flower canvas onto the main canvas
      ctx.drawImage(
        flowerCanvas,
        0, // Adjust the position if necessary
        0 // Adjust the position if necessary
      );

      // Reset comp. mode to default
      flowerCtx.globalCompositeOperation = "source-over";
    };

    flowerImg.src = layer1;
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

  const removeFlower = () => {
    setIsFlowerAdded(false);
  };

  const handleToggleLayer = () => {
    setAddLayer(!addLayer);
    if (addLayer) {
      removeFlower(); // Call removeFlower function when removing layer
    } else {
      addFlower(); // Call addFlower function when adding layer
    }
  };

  return (
    <div>
      <div style={{ border: "2px solid black", padding: "10px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <table>
        <thead>
          <tr>
            <th>Layer Name</th>
            <th>Optional Colors</th>
            <th>Added/Not Added</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Layer 1</td>
            <td>
              <div className="colorButtonContainer">
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
            </td>
            <td>Added</td>
          </tr>
          <tr>
            <td>Layer 2</td>
            <td>
              <div className="colorButtonContainer">
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
            </td>
            <td>
              <label className="layerCheckboxLabel" htmlFor="layerCheckbox">
               
                <input
                  type="checkbox"
                  id="layerCheckbox"
                  checked={addLayer}
                  onChange={handleToggleLayer}
                />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SareeDesigner;
