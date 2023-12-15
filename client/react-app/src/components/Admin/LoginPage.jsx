import React from 'react';
import LoginComponent from './LoginComponent';
import LayoutComponent from './LayoutComponent';

const LoginPage = () => {
  return (
    <div>
      <LayoutComponent>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: '1000px',
            fontSize: '40px',
            marginTop: 60,
            marginBottom: 60,
          }}
        >
          Administrative Backend System
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            minWidth: '1000px',
          }}
        >
          <LoginComponent />
        </div>
      </LayoutComponent>
    </div>
  );
};

export default LoginPage;
