import React, { useState, useRef, useEffect } from "react";
import GeneralNav from "../components/GeneralNav";
import { Form, Button, Table, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaTrash } from 'react-icons/fa';

function KandyanAdmin() {
  const [layer1image, setLayer1Image] = useState(null);
  const [layer2image, setLayer2Image] = useState(null);
  const [layer3image, setLayer3Image] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  // Create references for form inputs

  const layer1ImageRef = useRef(null);
  const layer2ImageRef = useRef(null);
  const layer3ImageRef = useRef(null);

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fine-tan-bunny-slip.cyclic.app/api/kandyan/getKandyanData"
        );
        if (response.ok) {
          const data = await response.json();
          setTableData(data); // Update tableData state with fetched data
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loading spinner

    const formData = new FormData();
    formData.append("layer1image", layer1image);
    formData.append("layer2image", layer2image);
    formData.append("layer3image", layer3image);

    try {
      const response = await fetch(
        "https://fine-tan-bunny-slip.cyclic.app/api/kandyan/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        const updatedData = await fetch(
          "https://fine-tan-bunny-slip.cyclic.app/api/kandyan/getKandyanData"
        );
        if (updatedData.ok) {
          const newData = await updatedData.json();
          setTableData(newData); // Update tableData state with updated data
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Image uploaded successfully.",
        });

        setIsLoading(false); // Hide loading spinner after successful upload

        // Clear form input values using refs

        layer1ImageRef.current.value = "";
        layer2ImageRef.current.value = "";
        layer3ImageRef.current.value = "";

        // Show success message using SweetAlert
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false); // Hide loading spinner on error
      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload image. Please try again later.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://fine-tan-bunny-slip.cyclic.app/api/kandyan/deleteKandyan/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image deleted successfully:", data);

        // Fetch updated data after deletion
        const updatedData = await fetch(
          "https://fine-tan-bunny-slip.cyclic.app/api/kandyan/getKandyanData"
        );
        if (updatedData.ok) {
          const newData = await updatedData.json();
          setTableData(newData); // Update tableData state with updated data
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Image deleted successfully.",
        });
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete image. Please try again later.",
      });
    }
  };

  return (
    <div>
      <GeneralNav />
      <section className="homecontainer">
        <div
          className="content__homecontainer"
          style={{
            border: "3px solid #5c48ee",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>
            <b>Kandyan Design</b>
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLayer1">
              <Form.Label>Layer 1 Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setLayer1Image(e.target.files[0])}
                ref={layer1ImageRef} // Add ref to layer1Image input
                required
              />
            </Form.Group>
            <Form.Group controlId="formLayer2">
              <Form.Label>Layer 2 Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setLayer2Image(e.target.files[0])}
                ref={layer2ImageRef} // Add ref to layer2Image input
                required
              />
            </Form.Group>
            <Form.Group controlId="formLayer3">
              <Form.Label>Layer 3 Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setLayer3Image(e.target.files[0])}
                ref={layer3ImageRef} // Add ref to layer3Image input
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {isLoading && <Spinner animation="border" role="status" />}
          </Form>
        </div>
        <div className="content__homecontainer">
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>Layer 1</th>
                <th>Layer 2</th>
                <th>Layer 3</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.layer1image ? "Uploaded" : "Not Uploaded"}</td>
                  <td>{item.layer2image ? "Uploaded" : "Not Uploaded"}</td>
                  <td>{item.layer3image ? "Uploaded" : "Not Uploaded"}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      <FaTrash /> {/* Trash icon */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </div>
  );
}

export default KandyanAdmin;
