import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  const loaderStyle = {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div
      style={{
        width: '100%',
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner animation="border"></Spinner>
    </div>
  );
};

export default Loader;
