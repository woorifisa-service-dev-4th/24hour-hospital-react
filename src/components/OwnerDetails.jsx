import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css'; // 파일 경로에 맞게 조정

function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/owners/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOwner(data);
        } else {
          setError('데이터 로딩 실패: ' + response.statusText);
        }
      } catch (error) {
        setError('네트워크 에러: ' + error.message);
      }
      setLoading(false);
    }
    fetchOwner();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!owner) return <div>No owner found.</div>;

  return (
    <div className="component-container">
      <h2>Owner Information</h2>
      
      <div className="table-container">
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
      </div>

      <div className="buttons-container">
        <a href="/" className="btn btn-primary">Edit Owner</a>
        <a href="/" className="btn btn-primary">Add New Pet</a>
      </div>
    </div>
  );
}

export default OwnerDetails;
