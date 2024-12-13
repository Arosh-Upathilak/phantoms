import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logging out...');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-card">
          <h2>Profile Management</h2>
          <p>View and edit your personal profile.</p>
          <button onClick={() => navigate('/profile')}>Go</button>
        </div>
        <div className="dashboard-card">
          <h2>Knowledge Sharing</h2>
          <p>Browse and share programming knowledge.</p>
          <button onClick={() => navigate('/note')}>Go</button>
        </div>
        <div className="dashboard-card">
          <h2>Digital Marketplace</h2>
          <p>Buy and sell digital projects.</p>
          <button onClick={() => navigate('/market')}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
