import React from 'react';
import './Popup.css';

interface PopupProps {
  onClose: () => void;
  content: React.ReactNode;
  className?: string;
}

export const Popup: React.FC<PopupProps> = ({ onClose, content, className }) => {

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className={`popup-container adjustmentTextColor ${className || ''}`} onClick={handleContentClick}>
        <button className="popup-close" onClick={onClose}>
          x
        </button>
        <div className="popup-content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popup;
