import React, { useState } from 'react';

function OwnerForm() {
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });

  const handleChange = (e) => {
    setOwner({
      ...owner,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API 호출 예시 (POST 요청)
    try {
      const response = await fetch('http://localhost:8080/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(owner)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('생성된 소유자:', data);
      } else {
        console.error('에러 발생:', response.statusText);
      }
    } catch (error) {
      console.error('네트워크 에러:', error);
    }
  };

  return (
    <div>
      <h2>Owner</h2>
      <form onSubmit={handleSubmit} className="form-horizontal" id="add-owner-form">
        <div className="form-group has-feedback">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={owner.firstName}
            onChange={handleChange}
            className="form-control"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={owner.lastName}
            onChange={handleChange}
            className="form-control"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={owner.address}
            onChange={handleChange}
            className="form-control"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={owner.city}
            onChange={handleChange}
            className="form-control"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            value={owner.telephone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit">
              {owner.isNew ? 'Add Owner' : 'Update Owner'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OwnerForm;