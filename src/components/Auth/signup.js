import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";
import './login.css';

function SignupComponent() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const doSignUp = (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      setMsg('Please enter a valid email address.');
      return;
    }

    if (!validatePassword()) {
      setMsg('Please enter a valid password.');
      return;
    }

    let customerObj = {
      "name": name,
      "city": city,
      "email": email,
      "user": {
        "username": username,
        "password": password
      }
    };

    axios.post('http://localhost:8585/customer/add', customerObj)
      .then(response => {
        setCustomer(response.data);
        navigate('/user/login?msg=signup success');
      })
      .catch(function (error) {
        setMsg('Issue in processing sign up');
      });
  };

  return (
    <>
      <div className="subbucontainer">
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
                  Already a member? <a href="/auth/login">Login</a>
                </p>
              </div>

              <div className="hello">
                <h2>QuickBook</h2>
                <h5>Makes Your Booking Easier</h5>
              </div>

              <form onSubmit={doSignUp}>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="UserName"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input_text">
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye-icon" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="btn">
                  <button type="submit">Sign up</button>
                </div>
              </form>
              {Msg && <div className="error-message">{Msg}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;
