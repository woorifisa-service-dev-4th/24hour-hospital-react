import React, { useState } from 'react';
import '../styles.css';

function OwnerSearch({ onSearchResults }) {
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/owners?lastName=${encodeURIComponent(lastName)}`);
      if (response.ok) {
        const data = await response.json();
        onSearchResults && onSearchResults(data);
      } else {
        setError('검색 실패: ' + response.statusText);
      }
    } catch (error) {
      setError('네트워크 에러: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Find Owners</h2>
      <form onSubmit={handleSubmit} className="form-horizontal" id="search-owner-form">
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            size="30"
            maxLength="80"
          />
        </div>
        <div className="buttons-container">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Searching...' : 'Find Owner'}
          </button>
          <a className="btn" href="/owners/new">Add Owner</a>
        </div>
      </form>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OwnerSearch;