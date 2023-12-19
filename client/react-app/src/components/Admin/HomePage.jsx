import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageScroller } from './ImageScroller';
import ParticleComponent from './ParticleComponent';
import { Button } from 'antd';
import '../../styles/style.css';

const HomePage = () => {
  useEffect(() => {
    document.title = 'iSEECRM';
  }, []);

  return (
    <div
      id="homepage"
      style={{
        backgroundColor: '#151515',
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignContent: 'center',
          top: 60,
          color: 'white',
          fontSize: '80px',
        }}
      >
        iSEECRM
      </div>
      <div
        className="drift-text"
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignContent: 'center',
          top: 80,
          color: '#cdcbcb',
          fontSize: '36px',
        }}
      >
        Innovation | Revolution
      </div>
      <ImageScroller />
      <ParticleComponent />
      <div
        className="blink-text"
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignContent: 'center',
          top: 540,
        }}
      >
        <Link to="/admin/login">
          <Button
            style={{ width: 600, height: 50 }}
            type="primary"
            shape="round"
            size={'large'}
          >
            開始使用
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
