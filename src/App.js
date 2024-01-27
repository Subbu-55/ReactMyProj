
import './App.css';
import ColorSchemesExample from './components/customer/dashboard';
import React from 'react';
import NavigationBar from './components/navbar';
import CustomerDashboard from './components/customer/dashboard';
import { Route, Routes } from 'react-router';
import Login from './components/Auth/login';
import BussesComponent from './components/customer/busses';
import HomeComponent from './components/customer/home';
import Demo from './components/customer/demo';
import SignupComponent from './components/Auth/signup';

import BusoperatorComponent from './components/BusOperator/dashboard';
import GetAllBusses from './components/customer/allbusses';
import TicketBooking from './components/customer/ticketbooking'
import PreviousBookings from './components/customer/previousBookings';
import ExecutiveDashboard from './components/Executive/dashboard';
import BusUpdatePage from './components/BusOperator/busUpdate';
import EmailPage from './components/customer/email';
import ContactPage from './components/customer/contact';




function App() {
  return (
    <div className="App">
      {/* <CustomerDashboard/> */}
      {/* <HomeComponent/> */}
      
      {/* <BussesComponent />  */}
      {/* <SignupComponent /> */}
      
       <Routes>
        <Route path="/customer/dashboard/:cid" element={<CustomerDashboard/>}></Route>
     <Route path="/" element={<HomeComponent/>}></Route>
    
     <Route path='/user/login'element={<Login/>}></Route>
     
     {/* <Route path='/busses/get'element={<BussesComponent/>}></Route> */}
     <Route path='/auth/signup'element={<SignupComponent/>}></Route>
     <Route path='/busoperator/dashboard/:id'element={<BusoperatorComponent/>}></Route>
     <Route path='/executive/dashboard/:eid'element={<ExecutiveDashboard/>}></Route>
     <Route path='/busShedule/get-all'element={<GetAllBusses/>}></Route>
     <Route path='/previous_bookings/:cid'element={<PreviousBookings/>}></Route>
     <Route path='/ticketbooking/post/:cid/:busId'element={<TicketBooking />}></Route>
     <Route path="/update-bus/:id" element={<BusUpdatePage />} ></Route>
     <Route path="/contact" element={<ContactPage />} />
        <Route path="/email" element={<EmailPage />} />
    

     </Routes> 
     
    </div>
  );
}

export default App;
