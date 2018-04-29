import React from 'react';

const Button = ({ onClick, buttonText }) => {
  const { buttonStyle, divStyle } = styles;
  return (
    <div style={divStyle}>
      <button style={buttonStyle} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

const styles = {
  buttonStyle: {
    backgroundColor: '#73e03c',
    height: '40px',
    width: '300px',
    borderRadius: 20,
    color: '#fff',
    fontSize: 16,
    outline: 0
  },
  divStyle: {
    paddingTop: '25px',
  }
}

export { Button };
