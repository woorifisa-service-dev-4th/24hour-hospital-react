import React, { useState, useEffect } from 'react';

function OwnersList() {
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchOwners() {
      try {
        // 예시: 페이지별 소유자 목록 API 호출 (백엔드에 맞게 URL 조정)
        const response = await fetch(`http://localhost:8080/owners?page=${currentPage}`);
        if (response.ok) {
          const data = await response.json();
          // data.owners: 소유자 배열, data.totalPages: 전체 페이지 수
          setOwners(data.owners);
          setTotalPages(data.totalPages);
        } else {
          console.error('소유자 목록 로딩 실패:', response.statusText);
        }
      } catch (error) {
        console.error('네트워크 에러:', error);
      }
    }
    fetchOwners();
  }, [currentPage]);

  return (
    <div>
      <h2>Owners</h2>
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
          {owners.map((owner) => (
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
          ))}
        </tbody>
      </table>
      <div>
        {/* 단순 페이지 네비게이션 예시 */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OwnersList;