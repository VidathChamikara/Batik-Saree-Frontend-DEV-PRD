import React, { useEffect, useState } from "react";
import layer1 from "../images/base.jpeg";
import layer2 from "../images/layer2.png";
import layer3 from "../images/layer3.png";
import "../css/colorButton.css";
import { Table, Form, DropdownButton, Badge } from "react-bootstrap";

const SareeDesigner = () => {
  const [selectedLayer1Color, setSelectedLayer1Color] = useState("transparent"); // Initially transparent
  const [layer2Color, setLayer2Color] = useState("#FF0000");
  const [is2LayerAdded, setIs2LayerAdded] = useState(false);
  const [add2Layer, setAdd2Layer] = useState(false);

  const [layer3Color, setLayer3Color] = useState("#00ff00");
  const [is3LayerAdded, setIs3LayerAdded] = useState(false);
  const [add3Layer, setAdd3Layer] = useState(false);

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

    img1.src = layer1;

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
        addLayer2ToCanvas(canvas1.width, canvas1.height); // Pass canvas dimensions
      }

      if (is3LayerAdded) {
        addLayer3ToCanvas(canvas1.width, canvas1.height); // Pass canvas dimensions
      }
    };

    render(ctx1, img1);
  }, [
    canvasRef,
    selectedLayer1Color,
    is2LayerAdded,
    is3LayerAdded,
    canvasWidth,
    canvasHeight,
  ]);

  const addLayer2ToCanvas = (canvasWidth, canvasHeight) => {
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

    img2.src = layer2;
  };

  const addLayer3ToCanvas = (canvasWidth, canvasHeight) => {
    const canvas1 = canvasRef.current;
    const ctx1 = canvas1.getContext("2d");
    const img3 = new Image();

    img3.onload = () => {
      const Canvas3 = document.createElement("canvas");
      Canvas3.width = canvasWidth; // Match main canvas width
      Canvas3.height = canvasHeight; // Match main canvas height
      const Ctx3 = Canvas3.getContext("2d");

      // Draw flower image with applied color on the off-screen canvas
      Ctx3.drawImage(img3, 0, 0, canvasWidth, canvasHeight);
      Ctx3.globalCompositeOperation = "source-in";
      Ctx3.fillStyle = layer3Color;
      Ctx3.fillRect(0, 0, canvasWidth, canvasHeight);

      // Composite the flower canvas onto the main canvas
      ctx1.drawImage(
        Canvas3,
        0, // Adjust the position if necessary
        0 // Adjust the position if necessary
      );

      // Reset comp. mode to default
      Ctx3.globalCompositeOperation = "source-over";
    };

    img3.src = layer3;
  };

  const changeLayer1Color = (color) => {
    setSelectedLayer1Color(color);
  };

  const changeLayer2Color = (color) => {
    setLayer2Color(color);
  };

  const changeLayer3Color = (color) => {
    setLayer3Color(color);
  };

  const addLayer2 = () => {
    setIs2LayerAdded(true);
  };

  const addLayer3 = () => {
    setIs3LayerAdded(true);
  };

  const removeLayer2 = () => {
    setIs2LayerAdded(false);
  };

  const removeLayer3 = () => {
    setIs3LayerAdded(false);
  };

  const handleToggle2Layer = () => {
    setAdd2Layer(!add2Layer);
    if (add2Layer) {
      removeLayer2(); // Call removeFlower function when removing layer
    } else {
      addLayer2(); // Call addFlower function when adding layer
    }
  };

  const handleToggle3Layer = () => {
    setAdd3Layer(!add3Layer);
    if (add3Layer) {
      removeLayer3(); // Call removeFlower function when removing layer
    } else {
      addLayer3(); // Call addFlower function when adding layer
    }
  };

  return (
    <div>
      <h3>Kandyan Showroom</h3>
      <div style={{ border: "2px solid black", padding: "1px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Layer Name</th>
            <th>Added/Not Added</th>
            <th>Optional Colors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Layer 1</td>
            <td><Badge>Added</Badge></td>
            <td>
              <DropdownButton id="colorDropdown" title="Color">
                <div className="colorButtonContainer">
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#FFFF00" }}
                    onClick={() => changeLayer1Color("transparent")}
                  ></div>
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#ff00ff" }}
                    onClick={() => changeLayer1Color("#ff00ff")}
                  ></div>
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#00ffff" }}
                    onClick={() => changeLayer1Color("#00ffff")}
                  ></div>
                </div>
              </DropdownButton>
            </td>
          </tr>
          <tr>
            <td>Layer 2</td>
            <td>
              <div>
                <Form.Check
                  type="checkbox"
                  id="layerCheckbox"
                  checked={add2Layer}
                  onChange={handleToggle2Layer}
                  label={
                    add2Layer ? <Badge>Added</Badge> : <Badge>Not Added</Badge>
                  }
                />
              </div>
            </td>
            <td>
              <DropdownButton id="colorDropdown" title="Color">
                <div className="colorButtonContainer">
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#FF0000" }}
                    onClick={() => changeLayer2Color("#FF0000")}
                  ></div>
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
              </DropdownButton>
            </td>
          </tr>
          <tr>
            <td>Layer 3</td>
            <td>
              <Form.Check
                type="checkbox"
                id="layerCheckbox"
                checked={add3Layer}
                onChange={handleToggle3Layer}
                label={
                  add3Layer ? <Badge>Added</Badge> : <Badge>Not Added</Badge>
                }
              />
            </td>
            <td>
              <DropdownButton id="colorDropdown" title="Color">
                <div className="colorButtonContainer">
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#00ff00" }}
                    onClick={() => changeLayer2Color("#00ff00")}
                  ></div>
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#ff00ff" }}
                    onClick={() => changeLayer3Color("#ff00ff")}
                  ></div>
                  <div
                    className="colorButton"
                    style={{ backgroundColor: "#00ffff" }}
                    onClick={() => changeLayer3Color("#00ffff")}
                  ></div>
                </div>
              </DropdownButton>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* Material Selection */}
      <div>
        <Form.Group controlId="materialSelection">
          <Form.Label>
            <b>Select Material:</b>
          </Form.Label>
          <div className="radio-container">
            <div className="row">
              <div className="col">
                <Form.Check
                  type="radio"
                  name="material"
                  label="Super voil"
                  // Add event handlers if needed
                />
              </div>
              <div className="col">
                <Form.Check
                  type="radio"
                  name="material"
                  label="Silk"
                  // Add event handlers if needed
                />
              </div>
              <div className="col">
                <Form.Check
                  type="radio"
                  name="material"
                  label="Java painted"
                  // Add event handlers if needed
                />
              </div>
            </div>
          </div>
        </Form.Group>
      </div>
      <b>Price:</b>
      <b>Model No:</b>
    </div>
  );
};

export default SareeDesigner;
