import React from 'react';
import './Header.css';

export const HeaderView = ({title}) => {
  return (
    <div className="header-container">
      <h1 className="header-title">{title}</h1>
    </div>
  );
};