import React, { useState } from "react";

const ImageCard = ({ image }) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    });
  };

  return (
    <div
      className="image_card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={image.PictureUrl} alt={image.alt} />
      <div
        className="text"
        style={{
          display: isHovering ? "block" : "none",
          left: `${hoverPosition.x}px`,
          top: `${hoverPosition.y}px`,
          position: "absolute", // Ensure this is positioned absolutely within image_card
        }}
      >
        <p>{image.Description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
