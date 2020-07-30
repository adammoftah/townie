import React from 'react';
import useSwr from 'swr';

import RepresentativeSearch from 'components/RepresentativeSearch';
import { getLayout } from 'components/MapLayout';

//const fetcher = (...args) => fetch(...args).then(res => res.json())

function Representatives() {
  return (
    <div className="sidebar-content">
      <RepresentativeSearch/>   
      
    </div>
  );
}

Representatives.getLayout = getLayout;

export default Representatives;