import React, { useEffect } from 'react';
import useSwr from 'swr';

import { MapMarkersContext } from 'components/MapMarkersContext';
import { getLayout } from 'components/MapLayout';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function RepresentativesPage() {
    const { setState: setMapMarkers } = React.useContext(MapMarkersContext);
    const { data, error } = useSwr('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBe7_ta_1zNod6CsCJI6ssWk64kyO14HZo&address=104-40%20Queens%20Blvd%2011375', fetcher);
    if (error) {
      console.error('Error loading data Google Civic API: ', error);
    }
  
    //fetch('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBe7_ta_1zNod6CsCJI6ssWk64kyO14HZo&address=104-40%20Queens%20Blvd%2011375'),
  
    useEffect(() => {
        // var input_address = "";
        // site.normalizedInput.map(item => input_address+= item + " ");


      const formattedData = (data || []).map((site) => ({
        key: site.normalizedInput,
        output: site.officials,
        coordinates: {
            lat: 40.717410,
            lng: -73.834870,
          },
      }));
      console.log("formatted data", formattedData);
    setMapMarkers(formattedData);

    return () => {
      setMapMarkers([]);
    }
  }, [data, setMapMarkers]);
  
  
    return (
      <div className="sidebar-content">
        {error && 'Error loading content'}
        {/* {error && formattedData} */}
        {!data && !error && 'Loading...'}
        {!error && data && 'Data goes here in addition to the map'}
      </div>
    );
  }
  
  RepresentativesPage.getLayout = getLayout;
  
  export default RepresentativesPage;
  