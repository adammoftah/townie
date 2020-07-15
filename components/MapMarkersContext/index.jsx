import React from 'react';

export const MapMarkersContext = React.createContext([]);

export function Provider({ children }) {
  const [markers, setState] = React.useState([]);
  console.log('markers: ', markers);

  const markersState = React.useMemo(() => {
    return {
      markers,
      setState,
    };
  }, [markers, setState]);

  return (
  <MapMarkersContext.Provider value={markersState}>
    {children}
  </MapMarkersContext.Provider>
  );
}
