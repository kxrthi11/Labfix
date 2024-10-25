import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/psg.webp';
import FeatureSection from '../components/FeatureSection';


const AdminHomePage = () => {
  
  
    return (
      <div>
<AdminNavbar/>
    
<div className="mt-32">
        <FeatureSection />
      </div>
      </div>
    );
  };
  
export default AdminHomePage;
