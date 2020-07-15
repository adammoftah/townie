import React from 'react';

import { getLayout } from 'components/MapLayout';

function Index() {
  return (
    <div className="sidebar-content">
      Welcome to Townie
    </div>
  );
}

Index.getLayout = getLayout;

export default Index;
