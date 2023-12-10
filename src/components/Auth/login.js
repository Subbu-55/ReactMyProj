import React, { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import './bus3.jpg';
import axios from "axios";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function Login() {
  const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');
    const navigate = useNavigate();
    const[param]=useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const doLogin=(e)=>{
    e.preventDefault();
    let token = window.btoa(username+':'+password);
    console.log(token);
    axios.post('http://localhost:8585/auth/login',{},{
     headers:{
       'Authorization':'Basic '+ token
      }

    })
    .then(function(response){
      localStorage.setItem('username',username)
      localStorage.setItem('token',token)
      localStorage.setItem('id',response.data.id)
      localStorage.setItem('isLoggedIn',true)
      let role=response.data.user.role;
      switch(role){
        case 'CUSTOMER':
          navigate('/customer/dashboard/'+response.data.id)
          break;
          case 'BUSOPERATOR':
          navigate('/busoperator/dashboard/'+response.data.id)
          break;
          case 'EXECUTIVE':
          navigate('/executive/dashboard/'+response.data.id)
          break;
          default:

      }
    })
    .catch(function(error){
      setMsg('Invalid Credintials')
    })
}
  

  return (
    <>
      <div className="subbucontainer" >
        <div className="subbucard">
          <div className="subbuform">
            <div className="subbuleft-side">
              <img
                src="https://as1.ftcdn.net/v2/jpg/06/24/54/38/1000_F_624543888_ZUOYMRhLdd4xieIzX7HQdc17R74vjDF5.jpg"
                alt="Logo"
              />
            </div>

            <div className="subburight-side">
              <div className="register">
                <p>
                  Not a member? <a href="/auth/signup">Register Now</a>
                </p>
              </div>

              <div className="hello">
                <h2>QuickBook</h2>
                <h5>Makes Your Booking Easier</h5>
              </div>

              <form onSubmit={doLogin}>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    onChange={(e)=>setUsername(e.target.value)}/>
                   
                  
                </div>
                <div className="input_text">
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      onChange={(e)=>setPassword(e.target.value)}/>
                      
                   
                    <span className="eye-icon" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="subbuforgot-password">
                  <a href="#">Forgot Password?</a>
                </div>

                <div className="btn">
                  <button type="submit" >Login</button>
                </div>
              </form>

             
              
              {/* Add your social login buttons here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
