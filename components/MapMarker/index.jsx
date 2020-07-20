import React, { useState, useCallback } from 'react';

function titleCase(string){
  const y = string.split("_");
  y.forEach(function(value, i, array){
    array[i] = array[i][0].toUpperCase() + array[i].slice(1);
  });
  return (y.join(" "));
}

export const MapMarker = ({ text, site_info }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);  

  const toggleInfo = useCallback((e) => {
    setIsInfoOpen((wasOpen) => !wasOpen);
  }, [setIsInfoOpen]);

  return (
    <div className="map-marker-container">
      
      <button onClick={toggleInfo} className="map-marker">
        {/* {text} */}
        {/* <img onClick={toggleInfo} src="https://www.fultoncountyga.gov/-/media/Images/ICONS/COVID/coronavirus-testing-icon-01.ashx?h=300&w=300&la=en&hash=167F5E81A664D85DC93C64981F374240" className="map-marker" ></img> */}
      </button>
      <div
        className={`map-marker-info${isInfoOpen ? ' map-marker-info--active' : ''}`}
      >   
      {Object.keys(site_info).map(key => (
        <p>
          {titleCase(key)}: {site_info[key]}
        </p>
      ))}
      </div>
    </div>
  );
};
