// ColorButton.js
import React from "react";

const ColorButton = ({ color, onClick }) => {
  return (
    <div
      className="colorButton"
      style={{
        backgroundColor: color,
        width: "30px",
        height: "30px",
        marginRight: "5px",
        cursor: "pointer",
      }}
      onClick={() => onClick(color)}
    ></div>
  );
};

export default ColorButton;
