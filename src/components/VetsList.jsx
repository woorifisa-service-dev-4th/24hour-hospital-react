import React, { useState, useEffect } from 'react';
import '../styles.css';

function VetsList() {
  const [vets, setVets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 한 페이지당 항목 수
  const totalPages = Math.ceil(vets.length / pageSize);

  useEffect(() => {
    async function fetchVets() {
      try {
        const response = await fetch('http://localhost:8080/vets');
        if (response.ok) {
          const data = await response.json();
          // API가 배열을 직접 반환하는 경우
          if (Array.isArray(data)) {
            setVets(data);
          } else if (data.vets) {
            // API가 { vets: [...]} 형태로 반환할 경우
            setVets(data.vets);
          } else {
            console.error('예상치 못한 데이터 형식:', data);
          }
        } else {
          console.error('수의사 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    }
    fetchVets();
  }, []);

  // 현재 페이지에 해당하는 수의사 데이터만 추출
  const indexOfLastVet = currentPage * pageSize;
  const indexOfFirstVet = indexOfLastVet - pageSize;
  const currentVets = vets.slice(indexOfFirstVet, indexOfLastVet);

  return (
    <div className="component-container">
      <h2>Veterinarians</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialist</th>
          </tr>
        </thead>
        <tbody>
          {currentVets.length > 0 ? (
            currentVets.map((vet) => (
              <tr key={vet.id}>
                <td>{vet.firstName} {vet.lastName}</td>
                <td>{vet.specialist ? vet.specialist : 'None'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No veterinarians found.</td>
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
    </div>
  );
}

export default VetsList;

