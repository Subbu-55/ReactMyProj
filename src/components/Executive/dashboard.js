import React, { useEffect, useState } from 'react';
import './executiveDashboard.css';
import { Card, Col, Nav, Navbar, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExecutiveDashboard() {
    const [customers, setCustomers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [busOperators, setBusOperators] = useState([]);
    const [isCustomerDataFetched, setIsCustomerDataFetched] = useState(false);
    const [isScheduleDataFetched, setIsScheduleDataFetched] = useState(false);
    const [isBusOperatorDataFetched, setIsBusOperatorDataFetched] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const {eid}=useParams();
    const [newOperator, setNewOperator] = useState({
        name: '',
        city: '',
        user: {username:'',password:''}
    });
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8585/executive/get/customer');
            const data = response.data;
            setCustomers(data);
            setIsCustomerDataFetched(true);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:8585/busSchedule/get-all');
            const data = response.data;
            setSchedules(data);
            setIsScheduleDataFetched(true);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchBusOperators = async () => {
        try {
            const response = await axios.get('http://localhost:8585/executive/get/busOperator');
            const data = response.data;
            setBusOperators(data);
            setIsBusOperatorDataFetched(true);
        } catch (error) {
            console.error('Error fetching bus operators:', error);
        }
    };

    const handleAllCustomersClick = () => {
        setIsCustomerDataFetched(!isCustomerDataFetched);
        if (!isCustomerDataFetched) {
            fetchCustomers();
        }
    };

    const handleAllSchedulesClick = () => {
        setIsScheduleDataFetched(!isScheduleDataFetched);
        if (!isScheduleDataFetched) {
            fetchSchedules();
        }
    };

    const handleAllBusOperatorsClick = () => {
        setIsBusOperatorDataFetched(!isBusOperatorDataFetched);
        if (!isBusOperatorDataFetched) {
            fetchBusOperators();
        }
    };

    const handleAddBusOperator = () => {
        setShowSignUpForm(!showSignUpForm);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOperator((prevOperator) => ({
            ...prevOperator,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eid) {
                const response = await axios.post(`http://localhost:8585/busOperator/add/${eid}`, newOperator);
                console.log('Bus Operator added successfully:', response.data);
                setShowSignUpForm(false);
                // Fetch updated data after adding a new operator
                fetchBusOperators();
            } else {
                console.error('executiveId is undefined');
            }
        } catch (error) {
            console.error('Error adding bus operator:', error);
            console.log('Error response:', error.response);
        }
    };
    useEffect(() => {
        // Log the executiveId when the component mounts
        console.log('eid:', eid);
    }, [eid]);
    const backgroundImageUrl = 'https://st2.depositphotos.com/1041273/43175/v/450/depositphotos_431759732-stock-illustration-sightseeing-bus-emblem-on-white.jpg';


    return (
        <div>
            <style>{`
        body {
          background-image: url('${backgroundImageUrl}');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-color: #f5f5f5;
          color: #333;
          font-family: 'Roboto, sans-serif';
        }
      `}</style>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand href="#home">QuickBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {localStorage.getItem('isLoggedIn') ? (
                                <React.Fragment>
                                    <Navbar.Text>
                                        Signed in as: <span style={{ color: 'white' }}>{localStorage.getItem('username')}</span>
                                    </Navbar.Text>
                                    &nbsp;&nbsp;&nbsp;
                                    <button
                                        className="btn btn-info btn-sm ml-4"
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate('/user/login?msg=you have logged out..');
                                        }}
                                    >
                                        Logout
                                    </button>
                                </React.Fragment>
                            ) : (
                                <div style={{ display: 'flex' }}>
                                    <Nav.Link as={Link} to="/user/login" className="thick-color">
                                        Login
                                    </Nav.Link>
                                    &nbsp;&nbsp;
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <h1>Welcome Executive</h1>
            <div className="button-container">
                <button className="styled-button" onClick={handleAllCustomersClick}>
                    Customers
                </button>
                <button className="styled-button" onClick={handleAllSchedulesClick}>
                    Schedules
                </button>
                <button className="styled-button" onClick={handleAllBusOperatorsClick}>
                    BusOperators
                </button>
                <button className="styled-button" onClick={handleAddBusOperator}>
                    AddBusOperator
                </button>
            </div>

            {/* Display the fetched customers */}
            {isCustomerDataFetched && (
                <div>
                    <br />
                    <h2>Customer List</h2>
                    <Row>
                        {customers.map((customer) => (
                            <Col key={customer.id} md={4} className="mb-4">
                                <Card className="custom-card">
                                    <Card.Body>
                                        <Card.Title className="text-primary">{customer.name}</Card.Title>
                                        <hr className="my-3" />
                                        <Card.Text>
                                            <strong>City:</strong> {customer.city}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Email:</strong> {customer.email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Display the fetched schedules */}
            {isScheduleDataFetched && (
                <div>
                    <br />
                    <h2>Bus Schedules</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date Of Journey</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Fare</th>
                                <th>No Of Hours</th>
                                <th>Time Of Journey</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{schedule.id}</td>
                                    <td>{schedule.doj}</td>
                                    <td>{schedule.bus.source}</td>
                                    <td>{schedule.bus.destination}</td>
                                    <td>{schedule.fare}</td>
                                    <td>{schedule.noOfHours}</td>
                                    <td>{schedule.timeOfJourney}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Display the fetched bus operators */}
            {isBusOperatorDataFetched && (
                <div>
                    <br />
                    <h2>Bus Operator List</h2>
                    <Row>
                        {busOperators.map((busOperator) => (
                            <Col key={busOperator.id} md={4} className="mb-4">
                                <Card className="custom-card">
                                    <Card.Body>
                                        <Card.Title className="text-primary">{busOperator.name}</Card.Title>
                                        <hr className="my-3" />
                                        <Card.Text>
                                            <strong>City:</strong> {busOperator.city}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Display the signup form */}
            {showSignUpForm && (
                <div>
                    <br />
                    <h2>Add Bus Operator</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="operatorName" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="operatorName"
                                name="name"
                                value={newOperator.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="operatorCity" className="form-label">
                                City:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="operatorCity"
                                name="city"
                                value={newOperator.city}
                                onChange={handleChange}
                                required
                            />
                            </div>
                             <div className="mb-3">
                            <label htmlFor="operatorUserName" className="form-label">
                                Username:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="operatorUsername"
                                name="username"
                                value={newOperator.username}
                                onChange={handleChange}
                                required
                            />
                            </div>
                             <div className="mb-3">
                            <label htmlFor="operatorPassword" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="operatorPassword"
                                name="password"
                                value={newOperator.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add Operator
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ExecutiveDashboard;

