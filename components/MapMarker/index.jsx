import React, { useState, useCallback } from 'react';


export const MapMarker = ({ text, site_info }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  //console.log("markers",markers)
  //console.log("key",address)
  //console.log("info",info)
  //info = "--"

  const toggleInfo = useCallback((e) => {
    setIsInfoOpen((wasOpen) => !wasOpen);
  }, [setIsInfoOpen]);

  return (
    <div className="map-marker-container">
      <button onClick={toggleInfo} className="map-marker">{text}</button>
      <div
        className={`map-marker-info${isInfoOpen ? ' map-marker-info--active' : ''}`}
      >   
      {Object.keys(site_info).map(key => (
        <p>
          {key}: {site_info[key]}
        </p>
      ))}
      </div>
    </div>
  );
};
