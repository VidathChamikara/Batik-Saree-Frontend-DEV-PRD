import React, { useEffect, useState } from "react";
import base from "../images/base.jpeg";
import layer1 from "../images/layer2.png";
import layer2 from "../images/layer3.png";
import "../css/colorButton.css";
import { Table, Form } from "react-bootstrap";

const SareeDesigner = () => {
  const [selectedLayer1Color, setSelectedLayer1Color] = useState("transparent"); // Initially transparent
  const [layer2Color, setLayer2Color] = useState("red");
  const [is2LayerAdded, setIs2LayerAdded] = useState(false);
  const [add2Layer, setAdd2Layer] = useState(false);
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
      ctx1.fillStyle = selectedLayer1Color;
      ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

      ctx1.globalCompositeOperation = "destination-in";
      ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height);

      ctx1.globalCompositeOperation = "source-over";

      if (is2LayerAdded) {
        addFLayer2ToCanvas(canvas1.width, canvas1.height); // Pass canvas dimensions
      }
    };

    render(ctx1, img1);
  }, [canvasRef, selectedLayer1Color, is2LayerAdded, canvasWidth, canvasHeight]);

  const addFLayer2ToCanvas = (canvasWidth, canvasHeight) => {
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
      Ctx2.fillStyle = layer2Color;
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

  const changeLayer1Color = (color) => {
    setSelectedLayer1Color(color);
  };

  const changeLayer2Color = (color) => {
    setLayer2Color(color);
  };

  const addLayer2 = () => {
    setIs2LayerAdded(true);
  };

  const removeLayer2 = () => {
    setIs2LayerAdded(false);
  };

  const handleToggle2Layer = () => {
    setAdd2Layer(!add2Layer);
    if (add2Layer) {
      removeLayer2(); // Call removeFlower function when removing layer
    } else {
      addLayer2(); // Call addFlower function when adding layer
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
                  onClick={() => changeLayer1Color("#00ff00")}
                ></div>
                <div
                  className="colorButton"
                  style={{ backgroundColor: "#0000ff" }}
                  onClick={() => changeLayer1Color("#0000ff")}
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
                  onClick={() => changeLayer2Color("#ff00ff")}
                ></div>
                <div
                  className="colorButton"
                  style={{ backgroundColor: "#00ffff" }}
                  onClick={() => changeLayer2Color("#00ffff")}
                ></div>
              </div>
            </td>
            <td>
              <Form.Check
                type="checkbox"
                id="layerCheckbox"
                checked={add2Layer}
                onChange={handleToggle2Layer}
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
