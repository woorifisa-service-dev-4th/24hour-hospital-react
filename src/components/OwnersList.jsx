import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';

function OwnersList() {
  const location = useLocation();
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    // 상태로 전달된 데이터가 있으면 이를 사용
    if (location.state && location.state.owners) {
      setFilteredOwners(location.state.owners);
    } else {
      async function fetchOwners() {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:8080/owners');
          if (response.ok) {
            const data = await response.json();
            setOwners(data);
            setFilteredOwners(data);  // 처음 로드 시 모든 소유자 목록을 설정
          } else {
            setError('소유자 목록 로딩 실패: ' + response.statusText);
          }
        } catch (error) {
          setError('네트워크 에러: ' + error.message);
        }
        setLoading(false);
      }

      fetchOwners();
    }
  }, [location.state]);

  // 현재 페이지에 해당하는 소유자 데이터만 슬라이스
  const indexOfLastOwner = currentPage * pageSize;
  const indexOfFirstOwner = indexOfLastOwner - pageSize;
  const currentOwners = filteredOwners.slice(indexOfFirstOwner, indexOfLastOwner);

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
                          <td>
                            {owner.pets.length > 0
                                ? owner.pets.map(pet => pet.name).join(', ')
                                : '-'}
                          </td>
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
                {Array.from({ length: Math.ceil(filteredOwners.length / pageSize) }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={page === currentPage}
                    >
                      {page}
                    </button>
                ))}
                {currentPage < Math.ceil(filteredOwners.length / pageSize) && (
                    <>
                      <button onClick={() => setCurrentPage(currentPage + 1)}>Next ›</button>
                      <button onClick={() => setCurrentPage(Math.ceil(filteredOwners.length / pageSize))}>Last »</button>
                    </>
                )}
              </div>
            </>
        )}
      </div>
  );
}

export default OwnersList;
