import React from 'react';
import { Link } from 'react-router-dom';
import '../Welcome.css';

function Home() {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <img 
          src="/images/pets.png" 
          alt="PetClinic Logo" 
          className="welcome-logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/250x150?text=PetClinic";
          }}
        />
        <h1>Welcome to PetClinic</h1>
        <p>Your trusted partner in pet healthcare management</p>
      </div>

      <div className="welcome-cards">
        <div className="welcome-card">
          <div className="welcome-card-icon">🐾</div>
          <h3>Find Owners</h3>
          <p>Search for pet owners or add new ones to our database.</p>
          <Link to="/owners" className="welcome-btn">Find Owners</Link>
        </div>

        <div className="welcome-card">
          <div className="welcome-card-icon">👨‍⚕️</div>
          <h3>Veterinarians</h3>
          <p>View all of our veterinarians and their specialties.</p>
          <Link to="/vets" className="welcome-btn">View Vets</Link>
        </div>

      </div>

      <div className="welcome-footer">
        <p>PetClinic © 2025 - 서연 한비 승혁 예진</p>
      </div>
    </div>
  );
}

export default Home;