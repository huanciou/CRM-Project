import React, { useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import DashBoardComponent from './DashBoradComponent';

const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div>
      <LayoutComponent>
        <React.Fragment>
          <DashBoardComponent />
        </React.Fragment>
      </LayoutComponent>
    </div>
  );
};

export default DashboardPage;
