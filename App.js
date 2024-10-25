import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import HomePage from './pages/HomePage';
import DonorPage from './pages/DonorPage';
import RecipientPage from './pages/RecipientPage';
import Footer from './components/FooterComponent';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import AdminHomePage from './pages/AdminHomePage';
import Addusers from './pages/AddUsers';
import View from './pages/ViewComplaints';
import ViewUsers from './pages/ViewUsers';
import UpdateComplaint from './pages/UpdateComplaint';
import Profile from './components/profile';
import ResetPassword from './components/ResetPassword';
import AddLab from './pages/Addlabs';
import HistoryOfComplaints from './pages/ComplaintHistory';
import AdminPage from './pages/Adminpaje';
import AdminAssignTechnician from './pages/AssignComplaints';
import Mainhome from './pages/Mainhome';
import { TechnicianComplaints } from './pages/TechnicianComplaints';
import Mainlogin from './pages/Adminheadlogin';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app inside the AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/add-users" element={<Addusers />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/profile" element={<Profile />} /> {/* Updated */}
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Updated */}
          <Route path="/view-complaints" element={<View />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registercomplaint" element={<DonorPage />} />
          <Route path="/viewstatus" element={<RecipientPage />} />
          <Route path="/update-complaintstatus" element={<UpdateComplaint />} />
          <Route path="/add-labs" element={<AddLab />} />
          <Route path="/history" element={<HistoryOfComplaints/>} />
          <Route path="/Adminpage" element={<AdminPage/>} />
          <Route path="/AssignTechnicians" element={<AdminAssignTechnician/>} />
          <Route path="/mainhome" element={<Mainhome/>} />
          <Route path="/view-assignedcomplaints" element={<TechnicianComplaints/>} />
          <Route path="/admin-head-login" element={<Mainlogin/>} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
