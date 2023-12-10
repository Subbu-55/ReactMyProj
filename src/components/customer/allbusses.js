import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import NavigationBar from '../navbar';

const GetAllBusses = () => {
  const [busses, setBusses] = useState([]);

  
  useEffect(() => {
    
        axios.get(`http://localhost:8585/busSchedule/get-all`)
        .then(response=>setBusses(response.data))


  }, []); 

  return (
    <div>
        <NavigationBar />
    <Row>
      {busses.map((b) => (
        <Col md={12} key={b.bus.id} style={{ marginBottom: '20px' }}>
          <Card style={{ backgroundColor: "#dce0dd", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)" }}>
            <Card.Body>
              <Row>
                <div className='col-md-5'>
                  <h4>{b.busOperator.name}</h4>
                  <span>({b.bus.seatType}) / ({b.bus.busType})</span><br />
                  <span>[{b.doj}] : [{b.timeOfJourney}] </span>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-5'>
                  <h5>{b.bus.source} - {b.bus.destination}</h5>
                  <button type="button" className="btn btn-success">{b.fare}/- <span className="badge badge-light"></span></button>
                </div>
                <div className="col-md-1">
                  <Link to="/auth/login">
                    <Button style={{ margin: 25 }} className="btn btn-outline-primary">Book Tickets</Button>
                  </Link>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default GetAllBusses;
