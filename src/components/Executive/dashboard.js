
import React, { useEffect, useState } from 'react';
import './executiveDashboard.css';
import { Card, Col, Navbar, Nav, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
    marginBottom: '15px',
};

function ExecutiveDashboard() {
    const [customers, setCustomers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [busOperators, setBusOperators] = useState([]);
    const [isCustomerDataFetched, setIsCustomerDataFetched] = useState(false);
    const [isScheduleDataFetched, setIsScheduleDataFetched] = useState(false);
    const [isBusOperatorDataFetched, setIsBusOperatorDataFetched] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const { eid } = useParams();
    const [newOperator, setNewOperator] = useState({
        name: '',
        city: '',
        user: { username: '', password: '' },
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
            user: {
                ...prevOperator.user,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eid) {
                const response = await axios.post(`http://localhost:8585/busOperator/add/${eid}`, newOperator);
                console.log('Bus Operator added successfully:', response.data);
                setShowSignUpForm(false);
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
                .custom-card {
                    // Your existing custom card styles here
                }
            `}</style>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand href="#home">QuickBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={handleAllCustomersClick}>Customers</Nav.Link>
                            <Nav.Link onClick={handleAllSchedulesClick}>Schedules</Nav.Link>
                            <Nav.Link onClick={handleAllBusOperatorsClick}>BusOperators</Nav.Link>
                            <Nav.Link onClick={handleAddBusOperator}>AddBusOperator</Nav.Link>
                        </Nav>
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

{showSignUpForm && (
    <div>
        <br />
        <form className="your-form-class" onSubmit={handleSubmit}>
            <h2 className="your-heading-class">Add Bus Operator</h2>
            <br />
            <div className="your-input-container-class">
                <label htmlFor="operatorName" className="your-label-class">
                    Name:
                </label>
                <input
                    type="text"
                    className="your-input-class"
                    id="operatorName"
                    name="name"
                    placeholder="Enter operator name"
                    value={newOperator.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="your-input-container-class">
                <label htmlFor="operatorCity" className="your-label-class">
                    City:
                </label>
                <input
                    type="text"
                    className="your-input-class"
                    id="operatorCity"
                    name="city"
                    placeholder="Enter city"
                    value={newOperator.city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="your-input-container-class">
                <label htmlFor="operatorUsername" className="your-label-class">
                    Username:
                </label>
                <input
                    type="text"
                    className="your-input-class"
                    id="operatorUsername"
                    name="username"
                    placeholder="Enter username"
                    value={newOperator.user.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="your-input-container-class">
                <label htmlFor="operatorPassword" className="your-label-class">
                    Password:
                </label>
                <input
                    type="password"
                    className="your-input-class"
                    id="operatorPassword"
                    name="password"
                    placeholder="Enter password"
                    value={newOperator.user.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="your-button-class">
                Add Operator
            </button>
        </form>
    </div>
)}

        </div>
    );
}

export default ExecutiveDashboard;
