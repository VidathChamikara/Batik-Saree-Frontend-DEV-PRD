import React, { useEffect, useState } from "react";
import "../css/colorButton.css";
import model from "../images/kandyan.jpg";
import { Table, Form, DropdownButton, Badge } from "react-bootstrap";

const SareeDesigner = () => {
  const [selectedLayer1Color, setSelectedLayer1Color] = useState("transparent"); // Initially transparent
  const [layer2Color, setLayer2Color] = useState("#FF0000");
  const [is2LayerAdded, setIs2LayerAdded] = useState(false);
  const [add2Layer, setAdd2Layer] = useState(false);

  const [layer3Color, setLayer3Color] = useState("#00FF00");
  const [is3LayerAdded, setIs3LayerAdded] = useState(false);
  const [add3Layer, setAdd3Layer] = useState(false);

  const [layer1Image, setLayer1Image] = useState(null);
  const [layer2Image, setLayer2Image] = useState(null);
  const [layer3Image, setLayer3Image] = useState(null);

  const canvasWidth = 550; // Hardcoded width
  const canvasHeight = 180; // Hardcoded height
  const canvasRef = React.createRef();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://fine-tan-bunny-slip.cyclic.app/api/kandyan/getKandyanData"
        ); // Replace URL_TO_FETCH_IMAGES with your actual endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data);          
          setLayer1Image(data[0].layer1image);
          setLayer2Image(data[0].layer2image);
          setLayer3Image(data[0].layer3image);
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const canvas1 = canvasRef.current;
    const ctx1 = canvas1.getContext("2d");
    const img1 = new Image();

    img1.onload = () => {
      canvas1.width = canvasWidth;
      canvas1.height = canvasHeight;
      render(ctx1, img1);
    };

    img1.src = layer1Image;

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

    img2.src = layer2Image;
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

    img3.src = layer3Image;
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
      <section className="homecontainer">
        <div className="image__model__container">
          <div className="image__model">
            <img src={model} alt="model" className="big__image" />
          </div>
          <div className="small__images__container">
            <img src={model} alt="smallImage1" className="small__image" />
            <img src={model} alt="smallImage2" className="small__image" />
            <img src={model} alt="smallImage3" className="small__image" />
          </div>
        </div>
        <div className="content__homecontainer">
          <h3>
            <b>Kandyan Showroom</b>
          </h3>
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
                <td>
                  <Badge>Added</Badge>
                </td>
                <td>
                  <DropdownButton id="colorDropdown" title="Color">
                    <div className="colorButtonContainer">
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => changeLayer1Color("transparent")}
                      ></div>
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#FF00FF" }}
                        onClick={() => changeLayer1Color("#FF00FF")}
                      ></div>
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#00FFFF" }}
                        onClick={() => changeLayer1Color("#00FFFF")}
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
                        add2Layer ? (
                          <Badge>Added</Badge>
                        ) : (
                          <Badge>Not Added</Badge>
                        )
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
                        style={{ backgroundColor: "#FF00FF" }}
                        onClick={() => changeLayer2Color("#FF00FF")}
                      ></div>
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#00FFFF" }}
                        onClick={() => changeLayer2Color("#00FFFF")}
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
                      add3Layer ? (
                        <Badge>Added</Badge>
                      ) : (
                        <Badge>Not Added</Badge>
                      )
                    }
                  />
                </td>
                <td>
                  <DropdownButton id="colorDropdown" title="Color">
                    <div className="colorButtonContainer">
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#00FF00" }}
                        onClick={() => changeLayer3Color("#00FF00")}
                      ></div>
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#FF00FF" }}
                        onClick={() => changeLayer3Color("#FF00FF")}
                      ></div>
                      <div
                        className="colorButton"
                        style={{ backgroundColor: "#00FFFF" }}
                        onClick={() => changeLayer3Color("#00FFFF")}
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
          <br />
          <b>Price : </b> <br />
          <br />
          <b>Model No : </b>
        </div>
      </section>
    </div>
  );
};

export default SareeDesigner;
