import { useSearchParams } from "react-router-dom";
import NavigationBar from "../navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function BussesComponent() {
  const [param] = useSearchParams();
  const [busses, setBusses] = useState([]);

//   const searchFlights = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         http://localhost:8081/flight/getbysdd?source=${source}&destination=${destination}&date=${date}
//       );
//       console.log('API response:', response);
//       setFlights(response.data || []); 
//     } catch (error) {
//       console.error('Error searching flights:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    const source = param.get("source") || "";
const destination = param.get("destination") || "";
const doj = param.get("doj") || "";

    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Date of Journey:", doj);

    // Check if any parameter is null before making the request
    if (source !== null && destination !== null && doj !== null) {
        axios.get(`http://localhost:8585/bus/getsdd/hi?source=${source}&destination=${destination}&doj=${doj}`,{
          headers: {
            Authorization: `Basic ${btoa('Orange@busOp:Orange@123')}`, // Replace your_username and your_password
          }})
            .then(response => {
                console.log("Data from server:", response.data);
                setBusses(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } else {
        console.error("One or more parameters are missing in the URL");
        // Handle the case when one or more parameters are null, for example, show an error message
    }
}, []);


  return (
    <div>
      {busses.map((b, index) => (
        <div key={index}>
          {b.source},
          {b.destination}
        </div>
      ))}
    </div>
  );
}

export default BussesComponent;
