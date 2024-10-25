import React, { useState } from 'react';
import MainNavbar from '../components/MainNavbar';
import Users from '../components/Users';


const AddUsers = () => {

    return (
        <div>
      <MainNavbar /> {/* Add the Navbar component */}
      <div className="mt-32">
        <Users />
      </div>
       
      <div className="flex flex-col lg:flex-row mt-20 mb-10 mr-12 box-decoration-slice">
        {/* Additional content can go here */}
      </div>
    </div>
    );
};

export default AddUsers;
