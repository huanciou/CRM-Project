import React, { useEffect } from 'react';
import LoginComponent from './LoginComponent';
import LayoutComponent from './LayoutComponent';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Log-In';
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const adminToken = Cookies.get('adminToken');
      if (adminToken) {
        navigate('/admin/menuSetup');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      <LayoutComponent>
        <h
          style={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: '1000px',
            fontSize: '40px',
            marginTop: 60,
            marginBottom: 60,
            zIndex: 50,
          }}
        >
          Administrative Backend System
        </h>
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
