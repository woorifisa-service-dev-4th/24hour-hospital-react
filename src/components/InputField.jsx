import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, error }) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input 
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error ? (
          <div className="error" style={{ color: 'red' }}>
            {error}
          </div>
        ) : (
          // 성공 아이콘(예시) - 필요시 추가
          <span className="fa fa-ok" aria-hidden="true"></span>
        )}
      </div>
    </div>
  );
};

export default InputField;