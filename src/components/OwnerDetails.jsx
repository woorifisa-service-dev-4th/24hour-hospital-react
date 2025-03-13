import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await fetch(`http://localhost:8080/owners/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOwner(data);
        } else {
          console.error('데이터 로딩 실패:', response.statusText);
        }
      } catch (error) {
        console.error('네트워크 에러:', error);
      }
    }
    fetchOwner();
  }, [id]);

  if (!owner) return <div>Loading...</div>;

  return (
    <div>
      <h2>Owner Information</h2>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{owner.firstName} {owner.lastName}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.telephone}</td>
          </tr>
        </tbody>
      </table>
      {/* 예시: Edit Owner, Add New Pet 링크 */}
      <a href={`/${owner.id}/edit`} className="btn btn-primary">Edit Owner</a>
      <a href={`/${owner.id}/pets/new`} className="btn btn-primary">Add New Pet</a>
      {/* 추가로 owner.pets 및 각 pet의 visits 정보를 표시하는 로직을 추가할 수 있음 */}
    </div>
  );
}

export default OwnerDetails;