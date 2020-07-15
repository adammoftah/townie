import React, { useState, useCallback } from 'react';

export const MapMarker = ({ text }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = useCallback((e) => {
    setIsInfoOpen((wasOpen) => !wasOpen);
  }, [setIsInfoOpen]);

  return (
    <div className="map-marker-container">
      <button onClick={toggleInfo} className="map-marker">{text}</button>
      <div
        className={`map-marker-info${isInfoOpen ? ' map-marker-info--active' : ''}`}
      >
        show more info here
      </div>
    </div>
  );
};
