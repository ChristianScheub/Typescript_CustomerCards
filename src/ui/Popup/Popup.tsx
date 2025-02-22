import React from 'react';
import './Popup.css';

interface PopupProps {
  onClose: () => void;
  content: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ onClose, content }) => {
  // Handler for overlay click (closes popup)
  const handleOverlayClick = () => {
    onClose();
  };

  // Handler for content click (prevents closing)
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-container adjustmentTextColor" onClick={handleContentClick}>
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