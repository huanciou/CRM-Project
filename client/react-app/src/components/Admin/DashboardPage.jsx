import React from 'react';
import LayoutComponent from './LayoutComponent';
import DashBoardComponent from './DashBoradComponent';

const DashboardPage = () => {
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
