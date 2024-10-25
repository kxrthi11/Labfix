import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/psg.webp'; // Import the Navbar component
import MainNavbar from '../components/MainNavbar';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
<MainNavbar/>
  
    <div   className="relative bg-container"
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 0, 0), rgba(255, 255, 255, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100vh',
      marginTop: '63px',
    }}>
      <div className="flex flex-col lg:flex-row p-8 bg-gradient-to-blue from-white--600 to--300">
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center pt-10 pb-5">
          {/* Removed the existing image */}
        </div>

        <div className="flex-1 bg-white p-11 pt-10 pb-10 mt-20 mb-12 shadow-2xl shadow-blue-900 rounded-lg ml-12 max-w-xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to LabFix
          </h2>
          <p className="text-lg text-gray-700">
            Users can file complaints, track status, and receive notifications
          </p>
          <br />
          <div className="bottom-buttons home-bottom">
            <button
              className="button-main"
              onClick={() => {
                navigate("/add-users");
              }}
            >
              <span>Add Users</span>
            </button>
            &nbsp;&nbsp;
            <button
              className="button-main"
              onClick={() => {
                navigate("/add-labs");
              }}
            >
              <span>Add Labs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default HomePage;
