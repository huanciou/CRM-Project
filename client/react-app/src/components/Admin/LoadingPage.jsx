import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/admin/login');
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goToLogin}>
          Back To Login Page
        </Button>
      }
    />
  );
};
export default LoadingPage;
