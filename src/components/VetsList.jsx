// src/components/VetsList.jsx
import React, { useState, useEffect } from 'react';

function VetsList() {
  const [vets, setVets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchVets() {
      try {
        // API 엔드포인트에 맞게 URL 조정 (예: /vets?page=...)
        const response = await fetch(`http://localhost:8080/vets?page=${currentPage}`);
        if (response.ok) {
          const data = await response.json();
          // data 객체가 { vets: [...], totalPages: X } 형태라고 가정
          setVets(data.vets);
          setTotalPages(data.totalPages);
        } else {
          console.error('수의사 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    }
    fetchVets();
  }, [currentPage]);

  return (
    <div>
      <h2>Veterinarians</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialist</th>
          </tr>
        </thead>
        <tbody>
          {vets.map((vet) => (
            <tr key={vet.id}>
              <td>{vet.firstName} {vet.lastName}</td>
              <td>{vet.specialist ? vet.specialist : 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 간단한 페이지네이션 */}
      <div>
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
