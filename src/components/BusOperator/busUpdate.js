import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import NavigationBar from "../navbar";

function UpdateBus() {
  const { id } = useParams();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [bus, setBus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both source and destination are filled
    if (!source || !destination) {
      setErrorMessage("Please fill in both source and destination.");
      return;
    }

    let data = {
      source: source,
      destination: destination,
    };

    axios
      .put(`http://localhost:8585/bus/update/${id}`, data)
      .then((response) => {
        console.log("Updated Bus Data:", response.data);
        setBus(response.data); // If you want to update state with the response, you can do it here.
        setErrorMessage(""); // Clear any previous error message
      })
      .catch((error) => {
        console.error("Error updating bus:", error);
        setErrorMessage("Error updating bus. Please try again.");
      });
  };

  return (
    <div>
      <NavigationBar />

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookTitle">
            <Form.Label>
              <h5>Source</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter source"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label>
              <h5>Destination</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Group>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <br />

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateBus;
