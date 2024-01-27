import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavigationBar from "../navbar";
import { Card, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function CustomerDashboard() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [busses, setBusses] = useState([]);
  const [seatType, setSeatType] = useState("");
  const [busesMessage, setBusesMessage] = useState("");
  const navigate = useNavigate();
  const [busType, setBusType] = useState("");
  const { cid } = useParams();
  const [loading, setLoading] = useState(false);
  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Goa",
    "",
  ];
  const animatedComponents = makeAnimated();

  const handleBookTickets = (cid, busId) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      navigate(`/ticketbooking/post/${cid}/${busId}`);
    } else {
      navigate("/user/login");
    }
  };

  const filterBusses = async () => {
    try {
      setLoading(true);

      let filterTypes = null;

      if (seatType && busType) {
        filterTypes = `http://localhost:8585/bus/getwithbusseatType?source=${source}&destination=${destination}&doj=${date}&seatType=${seatType}&busType=${busType}`;
      } else if (seatType) {
        filterTypes = `http://localhost:8585/bus/getwithseatType?source=${source}&destination=${destination}&doj=${date}&seatType=${seatType}`;
      } else if (busType) {
        filterTypes = `http://localhost:8585/bus/getwithbusType?source=${source}&destination=${destination}&doj=${date}&busType=${busType}`;
      } else {
        filterTypes = `http://localhost:8585/bus/getbysdd/hi?source=${source}&destination=${destination}&doj=${date}`;
      }

      const response = await axios.get(filterTypes);
      setBusses(response.data || []);

      if (response.data.length === 0) {
        setBusesMessage("No buses available with the selected filters.");
      } else {
        setBusesMessage("");
      }
    } catch (error) {
      console.error("Error searching busses:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchBusses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8585/bus/getbysdd/hi?source=${source}&destination=${destination}&doj=${date}`
      );

      setBusses(response.data || []);
    } catch (error) {
      console.error("Error searching busses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterBusses();
  }, [seatType, busType, source, destination, date]);

  return (
    <div style={{ backgroundImage: "none" }}>
      <NavigationBar />
      <Container>
        <br />
        <h4>Welcome to QuickBook</h4>
        <br />
        <div
          style={{
            border: "1px solid ",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)",
          }}
        >
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>From</Form.Label>
                  <Select
                    components={animatedComponents}
                    isMulti={false}
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                    onChange={(selectedOption) =>
                      setSource(selectedOption.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>To</Form.Label>
                  <Select
                    components={animatedComponents}
                    isMulti={false}
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                    onChange={(selectedOption) =>
                      setDestination(selectedOption.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                    style={{ backgroundColor: "#eaeaea" }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Button
            type="submit"
            className="thick-blue-btn"
            onClick={searchBusses}
          >
            Search
          </Button>
        </div>
        <br />
        <br />
        {busses.length > 0 && (
          <div>
            <Row>
              <Col md={4}>
                <h5>Filters</h5>
                <Card
                  style={{
                    backgroundColor: "#dce0dd",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)",
                  }}
                >
                  <h6>SeatType</h6>

                  <Card.Body>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="SLEEPER"
                        checked={seatType === "SLEEPER"}
                        onChange={() =>
                          setSeatType(seatType === "SLEEPER" ? "" : "SLEEPER")
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label="SEATER"
                        checked={seatType === "SEATER"}
                        onChange={() =>
                          setSeatType(seatType === "SEATER" ? "" : "SEATER")
                        }
                      />

                      <hr />
                      <h6>BusType</h6>
                      <Form.Check
                        type="checkbox"
                        label="AC"
                        checked={busType === "AC"}
                        onChange={() =>
                          setBusType(busType === "AC" ? "" : "AC")
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label="NON-AC"
                        checked={busType === "NON-AC"}
                        onChange={() =>
                          setBusType(busType === "NON-AC" ? "" : "NON-AC")
                        }
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8}>
                <h5>Available Buses </h5>

                {busses.map((b) => (
                  <React.Fragment key={b.bus.id}>
                    <Col md={12} style={{ marginBottom: "20px" }}>
                      <Card
                        style={{
                          backgroundColor: "#dce0dd",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)",
                        }}
                      >
                        <Card.Body>
                          <Row>
                            <div className="col-md-5">
                              <h4>{b.busOperator.name}</h4>
                              <span>
                                ({b.bus.seatType}) / ({b.bus.busType})
                              </span>
                              <br />
                              <span>
                                [{b.doj}] : [{b.timeOfJourney}]{" "}
                              </span>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                              <h5>
                                {b.bus.source} - {b.bus.destination}
                              </h5>
                              <button type="button" class="btn btn-success">
                                {b.fare}/-{" "}
                                <span class="badge badge-light"></span>
                              </button>
                            </div>

                            <center>
                              <Button
                                type="button"
                                onClick={() => handleBookTickets(cid, b.bus.id)}
                                style={{ margin: 25 }}
                                class="btn btn-outline-primary"
                              >
                                Book Tickets
                              </Button>
                            </center>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </React.Fragment>
                ))}
              </Col>
            </Row>
          </div>
        )}

        <div
          className="row"
          style={{
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ overflow: "hidden", height: "25px" }}>
            <marquee
              style={{
                whiteSpace: "nowrap",
                animation: "marquee 30s linear infinite",
              }}
            >
              Offers Closing Soon
            </marquee>
          </div>
          <div className="col-md-4">
            <div className="card">
              <Nav.Link as={Link} to="/busShedule/get-all">
                {" "}
                <h5 className="card-header">NEWUSER</h5>
              </Nav.Link>
              <div className="card-body">
                <p className="card-text">
                  Get 10% off on your first bus reservation!
                </p>
              </div>
              <div className="card-footer">Valid until December 31, 2023</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <h5 className="card-header">FAMILYTRIP</h5>
              <div className="card-body">
                <p className="card-text">
                  Special discount for family trips. Save 15%!
                </p>
              </div>
              <div className="card-footer">
                Applicable for bookings of 4 or more passengers
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <h5 className="card-header">WEEKEND</h5>
              <div className="card-body">
                <p className="card-text">
                  Plan a weekend and save 20% on bus fares.
                </p>
              </div>
              <div className="card-footer">
                Valid for Friday and Saturday bookings
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CustomerDashboard;
