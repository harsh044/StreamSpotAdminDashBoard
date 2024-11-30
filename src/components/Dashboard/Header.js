import React from 'react';

import Logout from '../Logout';
import SyncData from '../SyncData';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>StreamSpot Management Dashboard</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Data</button>
        <SyncData setIsAuthenticated={setIsAuthenticated} />
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
