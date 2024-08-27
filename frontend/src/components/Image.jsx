import React from "react";
import "../styles/Gallery.css";

export const Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className="image-container">
      
        <img
          src={smallImage}
          className="gallery-image"
          alt={title}
        />
        <div className="hover-text">
          <h4>{title}</h4>
        </div>
      
    </div>
  );
};
