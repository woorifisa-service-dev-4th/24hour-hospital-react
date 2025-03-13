import React, { useState } from 'react';

function OwnerSearch({ onSearchResults }) {
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 예시: lastName을 쿼리 파라미터로 사용해 검색 API 호출
      const response = await fetch(`http://localhost:8080/owners?lastName=${lastName}`);
      if (response.ok) {
        const data = await response.json();
        onSearchResults && onSearchResults(data);
      } else {
        console.error('검색 실패:', response.statusText);
      }
    } catch (error) {
      console.error('네트워크 에러:', error);
    }
  };

  return (
    <div>
      <h2>Find Owners</h2>
      <form onSubmit={handleSubmit} className="form-horizontal" id="search-owner-form">
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            size="30"
            maxLength="80"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Find Owner</button>
        </div>
      </form>
      {/* Add Owner 버튼 - OwnerForm 페이지로 이동하는 링크 */}
      <a className="btn btn-primary" href="/owners/new">Add Owner</a>
    </div>
  );
}

export default OwnerSearch;