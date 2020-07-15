import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';

import { MapMarker } from 'components/MapMarker';
import { MapMarkersContext } from 'components/MapMarkersContext';

import config from './mapConfig';

function getMapOptions() {
  return config;
}

export function GoogleMap() {
  const { markers } = useContext(MapMarkersContext);

  return (
    <div className="google-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_BOOTSTRAP_URL }}
        defaultCenter={{lat: 40.635,lng: -73.94}}
        defaultZoom={13}
        options={getMapOptions}
      >
       {markers.map((item) => (
          <MapMarker
            key={item.key}
            text={item.text}
            lat={ item.coordinates.lat}
            lng={ item.coordinates.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
