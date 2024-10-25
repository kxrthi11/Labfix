import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API calls
import "../styles/forms.css";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        // Send login data to the backend
        const response = await axios.post('http://localhost:5000/api/technicians/login', { email, password });

        // If login is successful, store technician ID in local storage
        if (response.status === 200) {
            localStorage.setItem('technicianId', response.data.technicianId); // Store the technician ID
            navigate('/admin-home'); // Redirect to admin home
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid credentials');
    }
};


  return (
    <div className="storage-section">
      <div className="leftsection">
        {/* <img src={leftImage} alt="Left Section" className="left-image" /> */}
      </div>
      <div className="rightsection">
        <h1 className="h1-line-height" style={{ fontSize: '45px' }}>Welcome Technician</h1>
        <br />
        <div className="input-form">
          <div className="formsgroup">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email-id"
              className="formscontrol"
              id="inputEmail"
            />
          </div>
          <div className="formsgroup">
            <label htmlFor="inputPassword">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="formscontrol"
              id="inputPassword"
            />
            <br />
            <br />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div className="bottom-buttons">
            <button className="button-main" onClick={handleLogin}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
