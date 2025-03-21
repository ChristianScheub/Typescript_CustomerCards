import React, { CSSProperties } from "react";
import { Button } from "react-bootstrap";
import { IconType } from "react-icons";


export enum ButtonAlignment {
  LEFT = "LEFT",
  CENTER = "CENTER",
  RIGHT = "RIGHT",
}

interface FloatingBtnProps {
  alignment: ButtonAlignment;
  icon: IconType;
  onClick: () => void;
  ariaLabelledBy?: string; 
}


const FloatingBtn: React.FC<FloatingBtnProps> = ({ alignment, icon, onClick, ariaLabelledBy }) => {

  let positionStyle: CSSProperties;

  switch (alignment) {
    case ButtonAlignment.LEFT:
      positionStyle = {
        position: "fixed",
        bottom: "15vw",
        left: "0rem",
        transform: "translate(50%, -50%)",
        zIndex: 100,
      };
      break;
    case ButtonAlignment.CENTER:
      positionStyle = {
        position: "fixed",
        bottom: "15vw",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      };
      break;
    case ButtonAlignment.RIGHT:
      positionStyle = {
        position: "fixed",
        bottom: "15vw",
        right: "0rem",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      };
      break;
  }

  return (
    <div style={positionStyle} data-testid="floating-btnDiv">
      <Button
        style={{
          height: "4rem",
          width: "4rem",
          borderColor: "#3d6868",
          borderRadius: '50%',
        }}
        className="backgroundColorHighlight shadow"
        onClick={onClick}
        data-testid="floating-btn" 
        aria-labelledby={ariaLabelledBy}
      >
        {React.createElement(icon, { size: 35 })}
      </Button>
    </div>
  );
};

export default FloatingBtn;