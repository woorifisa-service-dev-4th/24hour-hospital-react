import React, { useState } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function OwnerSearch({ onSearchResults }) {
  const navigate = useNavigate();
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
          'Accept': 'application/json', // 서버가 JSON을 반환하도록 명확히 요청
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // 응답 내용을 확인
        throw new Error(`검색 실패: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json(); // JSON 응답 변환
      onSearchResults && onSearchResults(data); // 결과를 부모 컴포넌트에 전달

      // 검색된 데이터를 list로 넘기기 위해 상태로 전달
      navigate('/owners/list', { state: { owners: data } });

    } catch (error) {
      setError(`네트워크 에러: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
