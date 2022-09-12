import { faStar as starReg } from "@fortawesome/free-regular-svg-icons";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./rating.css";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <FontAwesomeIcon
        icon={rating >= 1 ? starSolid : starReg}
        style={rating >= 1 && { color: "gold" }}
      />
      <FontAwesomeIcon
        icon={rating >= 2 ? starSolid : starReg}
        style={rating >= 2 && { color: "gold" }}
      />
      <FontAwesomeIcon
        icon={rating >= 3 ? starSolid : starReg}
        style={rating >= 3 && { color: "gold" }}
      />
      <FontAwesomeIcon
        icon={rating >= 4 ? starSolid : starReg}
        style={rating >= 4 && { color: "gold" }}
      />
      <FontAwesomeIcon
        icon={rating >= 5 ? starSolid : starReg}
        style={rating >= 5 && { color: "gold" }}
      />
    </div>
  );
};

export default Rating;
