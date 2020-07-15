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
      name: site.site_name,   
      site_info: {
        provider_url: site.provider_url,
        additional_info: site.additional_info,
        address: site.address,
        phone: site.phone,
        monday: site.monday,
        tuesday: site.tuesday,
        wednesday: site.wednesday,
        thursday: site.thursday,
        friday: site.friday,
        saturday: site.saturday,
        sunday: site.sunday,
        screening_required: site.screening_required,
        appointment_required: site.appointment_required,
        antibody_testing: site.antibody_testing, 
      },                   
      coordinates: {
        lat: site.coordinates.lat,
        lng: site.coordinates.lng,
      },
    }));
    //console.log("formattedData",formattedData);
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
