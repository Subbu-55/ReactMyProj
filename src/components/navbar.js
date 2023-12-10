import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function NavigationBar() {
  const navigate=useNavigate();
  

  const handleMyBookings = () => {
    const cid = localStorage.getItem('id'); 
    console.log(cid);
    navigate('/previous_bookings/'+cid);
  };
  


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand href="#home">QuickBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Home</Nav.Link>
              <Nav.Link onClick={handleMyBookings}>My Bookings</Nav.Link>
              <NavDropdown title="About" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Contact</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Email</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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
    </div>
  );
}

export default NavigationBar;
