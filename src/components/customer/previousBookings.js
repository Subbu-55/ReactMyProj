import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import NavigationBar from "../navbar";
import { Table, Pagination } from "react-bootstrap";

function PreviousBookings() {
  const [bookings, setBookings] = useState([]);
  const { cid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (cid) {
      axios
        .get(`http://localhost:8585/customerBus/get/book/${cid}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching Bookings:", error);
        });
    }
  }, []);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavigationBar />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date of Booking</th>
              <th>Source</th>
              <th>Destination</th>
              <th>SeatType</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.dateOfBooking}</td>
                <td>{booking.bus.source}</td>
                <td>{booking.bus.destination}</td>
                <td>{booking.bus.seatType}</td>
              </tr>
            ))}
          </tbody>
        </Table><Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item

              
key={i + 1}
              active={i + 1 === currentPage}

              
onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next

            
onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
}

export default PreviousBookings;
