import React from 'react';
import AddApps from './AddApps';
import AppsTable from './AppsTable';

const AppsPage = () => {
  return (
    <div className='appsPage'>
      <AddApps />
      <AppsTable />
    </div>
  );
};

export default AppsPage;
