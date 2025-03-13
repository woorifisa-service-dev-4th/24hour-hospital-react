import React, { useState, useEffect } from 'react';
import '../styles.css'; // 파일 경로에 맞게 조정

function OwnersList() {
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageSize = 10; // 한 페이지당 항목 수

  // 전체 페이지 수는 owners 배열 길이에 기반 (클라이언트 페이지네이션)
  const totalPages = Math.ceil(owners.length / pageSize);

  useEffect(() => {
    async function fetchOwners() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/owners');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setOwners(data);
          } else if (data.owners) {
            setOwners(data.owners);
          } else {
            console.error('예상치 못한 데이터 형식:', data);
          }
        } else {
          setError('소유자 목록 로딩 실패: ' + response.statusText);
        }
      } catch (error) {
        setError('네트워크 에러: ' + error.message);
      }
      setLoading(false);
    }
    fetchOwners();
  }, []);

  // 현재 페이지에 해당하는 소유자 데이터만 슬라이스
  const indexOfLastOwner = currentPage * pageSize;
  const indexOfFirstOwner = indexOfLastOwner - pageSize;
  const currentOwners = owners.slice(indexOfFirstOwner, indexOfLastOwner);

  return (
    <div className="component-container">
      <h2>Owners</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Telephone</th>
                <th>Pets</th>
              </tr>
            </thead>
            <tbody>
              {currentOwners.length > 0 ? (
                currentOwners.map((owner) => (
                  <tr key={owner.id}>
                    <td>
                      <a href={`/owners/${owner.id}`}>
                        {owner.firstName} {owner.lastName}
                      </a>
                    </td>
                    <td>{owner.address}</td>
                    <td>{owner.city}</td>
                    <td>{owner.telephone}</td>
                    <td>{owner.pets ? owner.pets.join(', ') : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No owners found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            {currentPage > 1 && (
              <>
                <button onClick={() => setCurrentPage(1)}>« First</button>
                <button onClick={() => setCurrentPage(currentPage - 1)}>‹ Prev</button>
              </>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <>
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next ›</button>
                <button onClick={() => setCurrentPage(totalPages)}>Last »</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OwnersList;
