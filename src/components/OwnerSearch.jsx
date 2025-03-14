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
      const query = lastName.trim() ? `?lastName=${encodeURIComponent(lastName)}` : ''; // 검색어 없으면 전체 조회
      const response = await fetch(`http://localhost:8080/owners${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // 응답 내용을 확인
        throw new Error(`검색 실패: ${response.status} ${response.statusText} - ${errorText}`);
      }
    } catch (error) {
      setError('네트워크 에러: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="component-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Find Owners</h2>
      <form onSubmit={handleSubmit} className="form-horizontal" id="search-owner-form">
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label htmlFor="lastName" style={{ marginBottom: '8px', textAlign: 'left' }}>Last Name</label>
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Find Owner'}
          </button>
          <a className="btn btn-primary" href="/owners/new">Add Owner</a>
        </div>
      </form>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OwnerSearch;