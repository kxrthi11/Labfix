import React, { useState } from 'react';
import axios from 'axios';
import "../styles/AdminPage.css"; // Import the CSS file
import MainNavbar from '../components/MainNavbar';

const AdminPage = () => {
  const [technicians, setTechnicians] = useState([
    { name: '', email: '', expertise: '', password: '' }
  ]);

  // Handle change in the input fields
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTechnicians = [...technicians];
    updatedTechnicians[index][name] = value;
    setTechnicians(updatedTechnicians);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (let i = 0; i < technicians.length; i++) {
        await axios.post('http://localhost:5000/api/technicians', technicians[i]);
      }
      alert('Technicians added successfully!');
      setTechnicians([{ name: '', email: '', expertise: '', password: '' }]); // Reset form after submission
    } catch (error) {
      console.error('Error adding technicians:', error);
      alert('Failed to add technicians');
    }
  };

  // Add another technician input group
  const addTechnician = () => {
    setTechnicians([...technicians, { name: '', email: '', expertise: '', password: '' }]);
  };

  return (
    <div>
      <MainNavbar/>
    <div className="admin-page">
      <h2>Add Technicians</h2>
      <form onSubmit={handleSubmit}>
        {technicians.map((technician, index) => (
          <div key={index} className="technician-form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={technician.name}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={technician.email}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <label>Expertise:</label>
            <input
              type="text"
              name="expertise"
              value={technician.expertise}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={technician.password}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
        ))}
        <button type="button" className="add-button" onClick={addTechnician}>
          Add Another Technician
        </button>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default AdminPage;
