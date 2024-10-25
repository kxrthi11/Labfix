import React from 'react';
import HomeDescription from '../components/HomeDescription';
import Dashboard from '../components/Dashboard';
import FeatureSection from '../components/FeatureSection';
import Navbar from '../components/Navbar'; // Import the Navbar component

const HomePage = () => {
  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
    {/*  <div className="flex">
        <HomeDescription />
      </div>
      */}
      <div className="mt-32">
        <FeatureSection />
      </div>
      {/*<div className="mt-8">
        <Dashboard />
      </div>*/}
      <div className="flex flex-col lg:flex-row mt-20 mb-10 mr-12 box-decoration-slice">
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default HomePage;
