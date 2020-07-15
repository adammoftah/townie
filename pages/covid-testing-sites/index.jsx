import React, { useEffect } from 'react';
import useSwr from 'swr';

import { MapMarkersContext } from 'components/MapMarkersContext';
import { getLayout } from 'components/MapLayout';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CovidTestingSitesPage() {
  const { setState: setMapMarkers } = React.useContext(MapMarkersContext);
  const { data, error } = useSwr('/api/testing-sites', fetcher);
  if (error) {
    console.error('Error loading data from API for /api/testing-sites: ', error);
  }

  useEffect(() => {
    const formattedData = (data || []).map((site) => ({
      key: `${site.site_name}+${site.coordinates.lat}+${site.coordinates.lng}`,
      text: site.site_name,
      coordinates: {
        lat: site.coordinates.lat,
        lng: site.coordinates.lng,
      },
    }));
    setMapMarkers(formattedData);

    return () => {
      setMapMarkers([]);
    }
  }, [data, setMapMarkers]);


  return (
    <div className="sidebar-content">
      {error && 'Error loading content'}
      {!data && !error && 'Loading...'}
      {!error && data && 'Data goes here in addition to the map'}
    </div>
  );
}

CovidTestingSitesPage.getLayout = getLayout;

export default CovidTestingSitesPage;
