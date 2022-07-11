import React from "react";

const Start = ({ averageScore }) => {
  // Obtenemos el valor completo
  const maxStars = 5;
  const starPercentage = (averageScore / maxStars) * 100;
  // Redondeamos el resultado si es decimal
  const starPercentageRounded = Math.round(starPercentage);
  const StarStyles = () => {
    return {
      width: starPercentageRounded + "%",
    };
  };
  return (
    <div className="stars-gray">
      <div className="stars-yellow" style={StarStyles()}></div>
    </div>
  );
};

export default Start;
