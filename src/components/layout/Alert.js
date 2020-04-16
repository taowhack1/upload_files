import React from 'react';

const Alert = ({ alert }) => {
  return alert !== null && <div>{alert('Test Alert')}</div>;
};

export default Alert;
