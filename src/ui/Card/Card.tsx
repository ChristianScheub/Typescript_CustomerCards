import React from "react";
import { CardProps } from "./CardProps";
import "./Card.css";

const Card: React.FC<CardProps> = ({ children, style, className, onClick }) => {
  return (
    <div
      {...(onClick ? { onClick } : {})}
      style={style}
      className={`card-container ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
