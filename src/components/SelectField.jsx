import React from 'react';

const SelectField = ({ label, name, items = [], value, onChange, error }) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        >
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {error ? (
          <div className="error" style={{ color: 'red' }}>
            {error}
          </div>
        ) : (
          <span className="fa fa-ok" aria-hidden="true"></span>
        )}
      </div>
    </div>
  );
};

export default SelectField;