import React, { useEffect } from "react";
import axios from "axios";
import NavigationBar from "../navbar";
import { useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";

function TicketBooking() {
  const { cid, busId } = useParams();
  const [bus, setBus] = useState("");
  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [person, setPerson] = useState({
    passengerName: "",
    age: "",
    gender: "",
    seatNumber: "",
  });

  const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "20px",
  };

  const [booking, setBooking] = useState([]);

  const buttonStyle = {
    margin: "5px",
  };

  const selectSeatButtonStyle = (isAvailable) => ({
    backgroundColor: isAvailable ? "blue" : "aqua",
    margin: "5px",
    width: "50px",
    height: "50px",
  });

  const selectSeat = (seatNumber) => {
    if (isSeatAvailable(seatNumber)) {
      setPerson({ ...person, seatNumber });
    } else {
      alert("Please select a valid and available seat.");
    }
  };

  const addPassenger = () => {
    if (person.passengerName && person.age && person.seatNumber && person.gender) {
      setSelectedSeats([...selectedSeats, person.seatNumber]);
      setPassengers([...passengers, person]);
      setPerson({ passengerName: "", age: "", gender: "", seatNumber: "" });
    } else {
      alert("Please enter valid passenger details and select an available seat.");
    }
  };

  const isSeatAvailable = (seatNumber) => {
    return (
      availableSeats.includes(seatNumber) && !selectedSeats.includes(seatNumber)
    );
  };

  const renderSeatButton = (seat, isWindowSeat) => {
    let style = selectSeatButtonStyle(isSeatAvailable(seat));
    if (isWindowSeat) {
      style = { ...style, borderLeft: "5px solid #ccc" };
    } else {
      style = { ...style, borderRight: "5px solid #ccc" };
    }

    return (
      <Button
        key={seat}
        onClick={() => selectSeat(seat)}
        disabled={!isSeatAvailable(seat)}
        style={style}
      >
        {seat}
      </Button>
    );
  };

  const completeBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8585/customerBus/booking/multiple/${cid}/${busId}`,
        passengers
      );
      setBooking(response.data);
      alert("Booking completed!");
    } catch (error) {
      console.error("Error completing booking:", error);
      alert("Error completing booking. Please try again.");
    }
  };

  useEffect(() => {
    if (busId) {
      axios.get(`http://localhost:8585/bus/get/${busId}`).then((response) => {
        setBus(response.data);
      });

      axios.get(`http://localhost:8585/seat/get-all/${busId}`).then((response) => {
        setSeats(response.data);
      });

      axios.get(`http://localhost:8585/seat/getavailable/${busId}`).then((response) => {
        setAvailableSeats(response.data);
      });
    }
  }, [busId]);

  return (
    <div>
      <NavigationBar />
      <Container style={containerStyle}>
        <Row>
          <Col>
            <h3>Bus Ticket Booking</h3>
          </Col>
        </Row>

        <Row>
          <Col
            md={6}
            className="border border-primary rounded p-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h4>Add Passenger:</h4>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={person.passengerName}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setPerson({ ...person, passengerName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label>Age:</Form.Label>
                <Form.Control
                  type="text"
                  value={person.age}
                  placeholder="Enter your age"
                  onChange={(e) =>
                    setPerson({ ...person, age: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label>Gender:</Form.Label>
                <Form.Control
                  as="select"
                  value={person.gender}
                  onChange={(e) =>
                    setPerson({ ...person, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={addPassenger}
                style={buttonStyle}
              >
                Add Passenger
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h4>Left Window Seat:</h4>
                {seats
                  .filter((seat, index) => index % 4 === 0)
                  .map((seat, index) => {
                    const isWindowSeat = true;
                    return renderSeatButton(seat, isWindowSeat);
                  })}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h4>Left Aisle Seat:</h4>
                {seats
                  .filter((seat, index) => index % 4 === 2)
                  .map((seat, index) => {
                    const isWindowSeat = false;
                    return renderSeatButton(seat, isWindowSeat);
                  })}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h4>Right Window Seat:</h4>
                {seats
                  .filter((seat, index) => index % 4 === 1)
                  .map((seat, index) => {
                    const isWindowSeat = true;
                    return renderSeatButton(seat, isWindowSeat);
                  })}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h4>Right Aisle Seat:</h4>
                {seats
                  .filter((seat, index) => index % 4 === 3)
                  .map((seat, index) => {
                    const isWindowSeat = false;
                    return renderSeatButton(seat, isWindowSeat);
                  })}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h4>Passenger Details:</h4>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Seat</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{passenger.passengerName}</td>
                    <td>{passenger.age}</td>
                    <td>{passenger.gender}</td>
                    <td>{passenger.seatNumber}</td> {/* Include seat number here */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              variant="success"
              type="button"
              onClick={completeBooking}
              style={buttonStyle}
            >
              Complete Booking
            </Button>
          </Col>
        </Row>
        <div>
          <Button>
            Go to payment
            {booking && booking.totalPrice && (
              <span>&nbsp;&nbsp;{booking.totalPrice}/-</span>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default TicketBooking;
