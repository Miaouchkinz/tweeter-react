import React from 'react';
import './Navigation.css';

export const Navigation = () => {

  return (
    <nav id= "navbar">
      <span id="app-title">tweeter</span>
      <div>
        <span id="new-tweet"><strong>Write</strong> a new tweet</span>
        <i className="fas fa-angle-double-down bounce" id="arrow-icon"></i>
      </div>
    </nav>
  );
};