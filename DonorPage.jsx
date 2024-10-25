import React from 'react';
import Complaint from '../components/complain';
import Navbar from '../components/Navbar';

const DonorPage = () => {
  return (
    <div>
    <Navbar />
    <div className="flex">
      <Complaint />
    </div>
    </div>
  );
};

export default DonorPage;
