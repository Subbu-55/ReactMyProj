import { useEffect } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getBusses } from "../../store/actions/allbuses";
import NavigationBar from "../navbar";
import { Link } from "react-router-dom";

function GetAllBusses() {
    const dispatch = useDispatch();
    const { list: busses } = useSelector((state) => state.bus) || { list: [] };

    useEffect(() => {
        dispatch(getBusses());
    }, [dispatch]);

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
                                        <Link to="/user/login">
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
}

export default GetAllBusses;
