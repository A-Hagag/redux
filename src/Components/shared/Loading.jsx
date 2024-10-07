// src/components/shared/Loading.js

import React from "react";
import "./Loading.css"; // Import CSS for styling Ezzat

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
