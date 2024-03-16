import React from "react";
import GeneralNav from "../components/GeneralNav";
import { Table, Form, Button } from "react-bootstrap";

function KandyanAdmin() {
  return (
    <div>
      <GeneralNav />
      <section className="homecontainer">
      <div
          className="content__homecontainer"
          style={{ border: "3px solid #5c48ee", padding: "20px", borderRadius: "10px" }}
        >
          <h3>
            <b>Kandyan Design</b>
          </h3>
          <Form>
            <Form.Group controlId="formModelNo">
              <Form.Label>Model No</Form.Label>
              <Form.Control type="text" placeholder="Enter model number" />
            </Form.Group>
            <Form.Group controlId="formLayer1">
              <Form.Label>Layer 1 Image Upload</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <Form.Group controlId="formLayer2">
              <Form.Label>Layer 2 Image Upload</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <Form.Group controlId="formLayer3">
              <Form.Label>Layer 3 Image Upload</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="content__homecontainer"></div>
      </section>
    </div>
  );
}

export default KandyanAdmin;
