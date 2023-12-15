import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import EmptyComponent from './EmptyComponent';

const contentStyle = {
  height: '250px',
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '10px',
  marginTop: '7px',
};

const CarouselComponent = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <EmptyComponent imageStyle={{ marginTop: '60px' }} />;
  }

  return (
    <Carousel autoplay>
      {cards.map((item, index) => (
        <div key={index}>
          <h3 style={contentStyle}>
            <a href={item.url} rel="noopener noreferrer">
              <img
                src={item.img}
                alt={`Slide ${index + 1}`}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '10px',
                }}
              />
            </a>
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
