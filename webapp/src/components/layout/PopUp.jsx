import React, { useState, useEffect } from "react";
import "../../css/popup.css";

const Popup = ({ message, duration, isOpen, onClose }) => {
  useEffect(() => {
    let timer;
    if (isOpen && duration) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-card">
              <div className="popup-message">{message}</div>
              {/* <button onClick={onClose}>Close</button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
