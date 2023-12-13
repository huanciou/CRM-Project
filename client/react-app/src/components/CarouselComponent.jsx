import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import EmptyComponent from './EmptyComponent';

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '10px',
  marginTop: '34px',
};

const CarouselComponent = ({ cards }) => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetchItems().then((data) => {
  //     setItems(data);
  //   });
  // }, []);

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

// const fetchItems = () => {
//   return fetch('${window.location.origin}/api/1.0/user/profile/card')
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.error('Fetching items failed:', error);
//     });
// };

export default CarouselComponent;
