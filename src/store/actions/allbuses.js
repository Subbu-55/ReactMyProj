import axios from "axios";

export const getBusses = () => (dispatch) => {
  return axios.get('http://localhost:8585/busSchedule/get-all')
    .then(response => {
      dispatch({
        type: 'GET_LIST',
        payload: response.data
      });
    
      return response.data;
    })
    .catch(error => {
      
      console.error('Error fetching buses:', error);
    });
};
