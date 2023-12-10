import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function Demo(){
    const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const[busses,setBusses]=useState('');

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSearchParams(() => ({
  //     [name]: value,
  //   }));
  // };
 
  const [loading, setLoading] = useState(false);
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad']; // Adding cities to be displayed in the dropdown

    const searchBusses = async () => {
    try {
      console.log(source+destination+date)
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8585/bus/getbysdd/hi?source=${source}&destination=${destination}&doj=${date}`
      );
      
      console.log('API response:', response);
      setBusses(response.data || []); 
    } catch (error) {
      console.error('Error searching busses:', error);
    } finally {
      setLoading(false);

       }
   };
    return(
        <div>

        <Form >
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <InputGroup>
                  <Form.Select
                    name="source"
                    
                    onChange={(e) => setSource(e.target.value)}
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <InputGroup>
                  <Form.Select
                    name="destination"
                    
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                 
                  onChange={(e) => setDate(e.target.value)}
                  // Changing background color
                />
              </Form.Group>
            </Col>
          </Row>
          
        </Form>
        <Button type="submit" className="thick-blue-btn" onClick={searchBusses}>
            Search
          </Button>
          <div>
          {busses.map((b, index) => (
        <div key={index}>
          {b.bus.source},
          {b.bus.destination}
          {b.busOperator.name}
        </div>
      ))}
            
            
            
          </div>
        </div>
        
    )
}
export default Demo;