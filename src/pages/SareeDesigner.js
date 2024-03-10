import React, { useEffect, useState } from "react";
import base from "../images/base.jpeg";
import layer1 from "../images/layer2.png";
import layer2 from "../images/layer3.png";
import "../css/colorButton.css";
import { Table, Form } from "react-bootstrap";

const SareeDesigner = () => {
  const [selectedColor, setSelectedColor] = useState("transparent"); // Initially transparent
  const [flowerColor, setFlowerColor] = useState("red");
  const [isFlowerAdded, setIsFlowerAdded] = useState(false);
  const [addLayer, setAddLayer] = useState(false);
  const canvasWidth = 550; // Hardcoded width
  const canvasHeight = 180; // Hardcoded height
  const canvasRef = React.createRef();

  useEffect(() => {
    const canvas1 = canvasRef.current;
    const ctx1 = canvas1.getContext("2d");
    const img1 = new Image();

    img1.onload = () => {
      canvas1.width = canvasWidth;
      canvas1.height = canvasHeight;
      render(ctx1, img1);
    };

    img1.src = base;

    const render = (ctx1, img) => {
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      ctx1.globalCompositeOperation = "source-over";
      ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height);

      ctx1.globalCompositeOperation = "color-burn";
      ctx1.fillStyle = selectedColor;
      ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

      ctx1.globalCompositeOperation = "destination-in";
      ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height);

      ctx1.globalCompositeOperation = "source-over";

      if (isFlowerAdded) {
        addFlowerToCanvas(canvas1.width, canvas1.height); // Pass canvas dimensions
      }
    };

    render(ctx1, img1);
  }, [canvasRef, selectedColor, isFlowerAdded, canvasWidth, canvasHeight]);

  const addFlowerToCanvas = (canvasWidth, canvasHeight) => {
    const canvas1 = canvasRef.current;
    const ctx1 = canvas1.getContext("2d");
    const img2 = new Image();

    img2.onload = () => {
      const Canvas2 = document.createElement("canvas");
      Canvas2.width = canvasWidth; // Match main canvas width
      Canvas2.height = canvasHeight; // Match main canvas height
      const Ctx2 = Canvas2.getContext("2d");

      // Draw flower image with applied color on the off-screen canvas
      Ctx2.drawImage(img2, 0, 0, canvasWidth, canvasHeight);
      Ctx2.globalCompositeOperation = "source-in";
      Ctx2.fillStyle = flowerColor;
      Ctx2.fillRect(0, 0, canvasWidth, canvasHeight);

      // Composite the flower canvas onto the main canvas
      ctx1.drawImage(
        Canvas2,
        0, // Adjust the position if necessary
        0 // Adjust the position if necessary
      );

      // Reset comp. mode to default
      Ctx2.globalCompositeOperation = "source-over";
    };

    img2.src = layer1;
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
      <div style={{ border: "2px solid black", padding: "1px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <Table striped bordered hover>
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
              <Form.Check
                type="checkbox"
                id="layerCheckbox"
                checked={addLayer}
                onChange={handleToggleLayer}
                label=""
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SareeDesigner;
