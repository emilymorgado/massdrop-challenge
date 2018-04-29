import React from 'react';

const Header = (props) => {
  return (
    <div>
      <h1 style={styles.headerStyle}>
        {props.headerText}
      </h1>
    </div>
  );
}

const styles = {
  headerStyle: {
    padding: '20px',
    fontSize: 50,
    color: '#444'
  }
}

export { Header };
