import React from 'react';

const Input = ({ placeholder, type, value, label, onChange }) => {
  const { divStyle, inputStyle, labelStyle } = styles;
  return (
    <div style={divStyle}>
      <label style={labelStyle}>{
        label}
      </label>
      <input
        style={inputStyle}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const styles = {
  divStyle: {
    paddingBottom: '20px'
  },
  inputStyle: {
    height: '25px',
    width: '370px',
    fontSize: 16,
    fontWeight: 'none',
    padding: 10,
    paddingRight: 28,
    paddingLeft: 28,
    borderRadius: 5,
    autocorrect: 'off'
  },
  labelStyle: {
    display: 'flex',
    fontSize: '12px',
    color: '#d3d3d3'
  }
}

export { Input };
