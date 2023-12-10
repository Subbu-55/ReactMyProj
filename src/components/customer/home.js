import React from 'react';
import './home.css';

import bus from './bus3.jpg';
import NavigationBar from '../navbar';

function HomeComponent() {
  

  return (
    <div>
      <NavigationBar />
      <div className="container1" >
      <br/><br/>
        <header className="header" >
            <br/><br/>
          <h1>QuickBook</h1>
          <p>"Simplify your life, organize your moments, with QuickBook."</p>
          <a href="/customer/dashboard/:cid" className="book-now-button ">Book Now</a>
        </header>

        <footer className="footer">
          &copy; { new Date().getFullYear() } QuickBook
        </footer>
      </div>
    </div>
  );
}

export default HomeComponent;
