
import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

function BusoperatorComponent() {
  const { id } = useParams();
  const [busList, setBusList] = useState([]);
  const navigate = useNavigate();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showBuses, setShowBuses] = useState(false);
  const [showAddBusForm, setShowAddBusForm] = useState(false);
  const [addBusFormData, setAddBusFormData] = useState({});
  const naviagte = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8585/busOperator/get/bus/${id}`)
      .then((response) => {
        console.log(response.data);
        setBusList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUpdateClick = async (id) => {
    setShowUpdateForm(true);
    setShowUpdateForm(!showUpdateForm);
  };

  const handleAddBusClick = () => {
    setShowAddBusForm(true);
  };

  const handleAddBusFormSubmit = async () => {
    // Validate the form data
    if (
      !addBusFormData.source ||
      !addBusFormData.destination ||
      !addBusFormData.busNo ||
      !addBusFormData.seatType ||
      !addBusFormData.busType ||
      !addBusFormData.seatsAvailable
    ) {
      setValidationError('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8585/bus/add/${id}`, addBusFormData);

      console.log('Bus added successfully:', response.data);

      setShowAddBusForm(false);

      setBusList([...busList, response.data]);

      setAddBusFormData({
        source: '',
        destination: '',
        seatType: '',
        busType: '',
        busNo: '',
        seatsAvailable: '',
      });

      setValidationError('');
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  const handleShowBusesClick = () => {
    setShowBuses(!showBuses);
  };

  const handleFormSubmit = async () => {
    if (!updateFormData.name || !updateFormData.city) {
      setValidationError('Please enter valid details.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8585/busOperator/update/${id}`, updateFormData);

      console.log('Update successful:', response.data);

      setUpdateFormData({ name: '', city: '' });

      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteClick = async (busId) => {
    try {
      const response = await axios.delete(`http://localhost:8585/busOperator/bus/delete/${busId}`);

      console.log('Delete successful:', response.data);

      const updatedBusList = busList.filter((bus) => bus.id !== busId);
      setBusList(updatedBusList);
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleAddBusInputChange = (e) => {
    const { name, value } = e.target;
    setAddBusFormData({ ...addBusFormData, [name]: value });
  };

  const backgroundImageUrl =
    'https://st2.depositphotos.com/1041273/43175/v/450/depositphotos_431759732-stock-illustration-sightseeing-bus-emblem-on-white.jpg';

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
          <Navbar.Brand as={Link} to="/">
            QuickBook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="#" onClick={handleShowBusesClick}>
                Show My Buses
              </Nav.Link>
              <Nav.Link as={Link} to="#" onClick={() => handleUpdateClick(id)}>
                Update
              </Nav.Link>
              <Nav.Link as={Link} to="#" onClick={handleAddBusClick}>
                Add Bus
              </Nav.Link>
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

      <h2>Welcome Operator</h2>
      <div className="button-container"></div>
      <br />
      <br />
      <br />
      <br />
      {showAddBusForm && (
        <div className="add-bus-form-container">
          <div className="add-bus-form">
            <h3>Add Bus</h3>
            <div className="form-group">
              <label>Source:</label>
              <input
                type="text"
                placeholder="Enter source"
                name="source"
                value={addBusFormData.source}
                onChange={handleAddBusInputChange}
              />
            </div>
            <div className="form-group">
              <label>Destination:</label>
              <input
                type="text"
                placeholder="Enter destination"
                name="destination"
                value={addBusFormData.destination}
                onChange={handleAddBusInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bus Number:</label>
              <input
                type="text"
                placeholder="Enter bus number"
                name="busNo"
                value={addBusFormData.busNo}
                onChange={handleAddBusInputChange}
              />
            </div>
            <div className="form-group">
              <label>Seat Type:</label>
              <input
                type="text"
                placeholder="Enter seat type"
                name="seatType"
                value={addBusFormData.seatType}
                onChange={handleAddBusInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bus Type:</label>
              <input
                type="text"
                placeholder="Enter bus type"
                name="busType"
                value={addBusFormData.busType}
                onChange={handleAddBusInputChange}
              />
            </div>
            <div className="form-group">
              <label>Seats Available:</label>
              <input
                type="text"
                placeholder="Enter seats available"
                name="seatsAvailable"
                value={addBusFormData.seatsAvailable}
                onChange={handleAddBusInputChange}
              />
            </div>
            {validationError && <div className="error-message">{validationError}</div>}
            <button className="submit-button" onClick={handleAddBusFormSubmit}>
              Add Bus
            </button>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="update-form-container">
          <div className="update-form">
            <div className="form-group" style={{ border: 3 }}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={updateFormData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={updateFormData.city}
                onChange={handleInputChange}
              />
            </div>
            {validationError && <div className="error-message">{validationError}</div>}
            <button className="submit-button" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
          {updateSuccess && <div className="success-message">Your details changed successfully!</div>}
        </div>
      )}
      {showBuses && (
        <div className="bus-cards-container">
          {busList.map((bus) => (
            <div key={bus.id} className="bus-card">
              <div className="bus-details">
                <div className="bus-row">
                  <strong>Source:</strong> {bus.source}
                </div>
                <div className="bus-row">
                  <strong>Destination:</strong> {bus.destination}
                </div>
                <div className="bus-row">
                  <strong>Bus No:</strong> {bus.busNo}
                </div>
                <div className="bus-row">
                  <strong>Bus Type:</strong> {bus.busType}
                </div>
                <div className="bus-row">
                  <strong>Seats Available:</strong> {bus.seatsAvailable}
                </div>

                <div className="bus-row"></div>
                <div className="bus-buttons">
                  <button className="delete-button" onClick={() => handleDeleteClick(bus.id)}>
                    Delete
                  </button>
                  &nbsp;&nbsp;
                  <button className="update-button" onClick={() => naviagte(`/update-bus/${bus.id}`)}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusoperatorComponent;
