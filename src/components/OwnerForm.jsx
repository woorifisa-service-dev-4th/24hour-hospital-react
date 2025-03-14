import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function OwnerForm() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setOwner({
      ...owner,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(owner),
      });
      
      if (response.ok) {
        const ownerId = await response.json();
        console.log('Created owner with ID:', ownerId);
        
        setSuccessMessage('Owner created successfully!');
        
        setTimeout(() => {
          navigate(`/owners/${ownerId}`);
        }, 1500);
      } else {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        setError(`에러 발생 (${response.status}): ${response.statusText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('네트워크 에러: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Owner</h2>
      <form onSubmit={handleSubmit} className="form-horizontal" id="add-owner-form">
        <div className="form-group has-feedback">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={owner.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={owner.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={owner.address}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={owner.city}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            value={owner.telephone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* 🔹 버튼을 오른쪽 정렬 */}
        <div className="button-container">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Owner'}
          </button>
        </div>
      </form>
      
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OwnerForm;
