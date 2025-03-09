import React, { useState } from "react";

interface ColorPickerProps {
  onColorSelect?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect }) => {
  const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => handleColorSelect(color)}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: color,
            cursor: "pointer",
            border:
              selectedColor === color ? "3px solid #000" : "1px solid #ccc",
            transition: "transform 0.2s ease, border 0.2s ease",
            padding: 0,
            outline: "none",
            boxSizing: "border-box",
          }}
          title={`Farbe: ${color}`}
          aria-label={`Farbe ${color} auswählen`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
