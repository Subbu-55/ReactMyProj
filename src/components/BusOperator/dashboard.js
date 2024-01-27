import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect} from "react";
import axios from "axios";
import './dashboard.css';


function BusoperatorComponent(){
    const {id}=useParams();
    const[busList,setBusList]=useState([]);
    const navigate=useNavigate();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [showBuses, setShowBuses] = useState(false);
    const [showAddBusForm, setShowAddBusForm] = useState(false); 
    const [addBusFormData, setAddBusFormData] = useState({});
    const naviagte=useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8585/busOperator/get/bus/${id}`)
        .then(response=>{
            console.log(response.data)
            setBusList(response.data);
        })
        .catch(error=>{
            console.error('Eroor fetching data:',error);
        });
    },[]);

    const handleUpdateClick = async (id) => {
        setShowUpdateForm(true);
        setShowUpdateForm(!showUpdateForm);
       
       
    }
    const handleAddBusClick = () => {
      setShowAddBusForm(true);
    };
    const handleAddBusFormSubmit = async () => {
      try {
        // Make a POST request to add the bus
        const response = await axios.post(`http://localhost:8585/bus/add/${id}`, addBusFormData);
  
        // Handle the response as needed
        console.log("Bus added successfully:", response.data);
  
        // Close the Add Bus form after submission
        setShowAddBusForm(false);
  
        // Optionally, you can update the busList with the new data
        setBusList([...busList, response.data]);
  
        // Clear the form data after submission
        setAddBusFormData({
          source: '',
          destination: '',
          seatType: '',
          busType: '',
          busNo: '',
          seatsAvailable: ''
        });
      } catch (error) {
        console.error("Error adding bus:", error);
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
          // Make a PUT request to update the data
          const response = await axios.put(`http://localhost:8585/busOperator/update/${id}`, updateFormData);
    
          // Handle the response as needed
          console.log('Update successful:', response.data);
    
          // Clear the form data after a successful update
          setUpdateFormData({ name: '', city: '' });
    
          // Hide the update form after submission
          setShowUpdateForm(false);

        } catch (error) {
          console.error('Error updating data:', error);
        }
      };
      const handleDeleteClick = async (busId) => {
        try {
          // Assuming that bus.id is the unique identifier for the bus
          const response = await axios.delete(`http://localhost:8585/busOperator/bus/delete/${busId}`);
      
          // Handle the response as needed
          console.log('Delete successful:', response.data);
      
          // Update the busList after successful deletion (optional)
          const updatedBusList = busList.filter(bus => bus.id !== busId);
          setBusList(updatedBusList);
      
        } catch (error) {
          console.error('Error deleting bus:', error);
        }
      };
     
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData({ ...updateFormData, [name]: value });
      };

      const backgroundImageUrl = 'https://st2.depositphotos.com/1041273/43175/v/450/depositphotos_431759732-stock-illustration-sightseeing-bus-emblem-on-white.jpg';
    
    return(

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
            <Nav className="me-auto">
              <Nav.Link href="#features">Home</Nav.Link>
              <Nav.Link onClick={handleShowBusesClick}>My Busses</Nav.Link>
              <NavDropdown title="About" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Contact</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Email</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
            {
            localStorage.getItem('isLoggedIn')?
            <React.Fragment>
            <Navbar.Text >
            Signed in as: <span style={{color: "white"}}> 
            {localStorage.getItem('username')} 
            </span>
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-info btn-sm ml-4" onClick={()=>{
            localStorage.clear();
            navigate('/user/login?msg=you have logged out..')
          }}>Logout</button>
          </React.Fragment>
          : 
          
          <div style={{ display: 'flex' }}>
             <Nav.Link as={Link} to="/user/login" className="thick-color" >Login</Nav.Link>&nbsp;&nbsp;
             <Nav.Link as={Link} to="#signup" className="thick-color">Signup</Nav.Link>
          </div>

          }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      
      <h2>Welcome Operator</h2>
      <div className="button-container">
        <button
          className="update-button"
          onClick={() => handleUpdateClick(id)}
        >
          Update My Details
        </button>
        <button
          className="show-buses-button"
          onClick={handleShowBusesClick}
        >
          {showBuses ? 'Hide My Buses' : 'Show My Buses'}
        </button>
        <button
        className="add-button"
        onClick={handleAddBusClick}
      >
        Add Bus
      </button>
      </div><br /><br /><br />
      <br />
      {showAddBusForm && (
        <div className="add-bus-form-container">
          <div className="add-bus-form">
            {/* Form elements for adding a bus */}
            {/* Use onChange to update addBusFormData state */}
            <input
              type="text"
              placeholder="Source"
              value={addBusFormData.source}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, source: e.target.value })}
            />
            <input
              type="text"
              placeholder="Destination"
              value={addBusFormData.destination}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, destination: e.target.value })}
            />
             <input
              type="text"
              placeholder="BusNo"
              value={addBusFormData.busNo}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, busNo: e.target.value })}
            />
             <input
              type="text"
              placeholder="SeatType"
              value={addBusFormData.seatType}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, seatType: e.target.value })}
            />
            <input
              type="text"
              placeholder="BusType"
              value={addBusFormData.busType}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, busType: e.target.value })}
            />
             <input
              type="text"
              placeholder="SeatsAvailable"
              value={addBusFormData.seatsAvailable}
              onChange={(e) => setAddBusFormData({ ...addBusFormData, seatsAvailable: e.target.value })}
            />
            <button
              className="submit-button"
              onClick={handleAddBusFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}


      {showUpdateForm && (
        <div className="update-form-container">
          <div className="update-form">
            <div className="form-group" style={{border:3}}>
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
            {validationError && (
              <div className="error-message">
                {validationError}
              </div>
            )}
            <button
              className="submit-button"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
          {updateSuccess && (
            <div className="success-message">
              Your details changed successfully!
            </div>
          )}
        </div>
      )}
     {showBuses && (
      <div className="bus-cards-container">
        {busList.map(bus => (
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
              
              <div className="bus-row">
                
              </div>
              <div className="bus-buttons">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(bus.id)}
                >
                  Delete
                </button>&nbsp;&nbsp;
                <button
                  className="update-button"
                  onClick={() => naviagte (`/update-bus/${bus.id}`)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      
      </div>
      )}
    </div>
    )
}
export default BusoperatorComponent;