import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';
import { Collapse, theme } from 'antd';
const text =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi facilis fuga pariatur ex velit odio delectus fugiat natus placeat, deleniti maiores accusamus! Tenetur omnis sint explicabo qui quae porro ducimus magnam asperiores architecto est ea quidem sit, quia reprehenderit dolor esse et voluptatem. Porro soluta fuga cupiditate nisi, error iste.';
const getItems = (panelStyle, handleFetchData) => [
  {
    key: '1',
    label: '訂單編號：657a6336fdedb29ee0b1cf0a',
    children: (
      <div>
        <p>{text}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{
              backgroundColor: '#4267B2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 15px',
              fontSize: '16px',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.1s',
              margin: '10px',
            }}
            onClick={() => handleFetchData('data1')}
          >
            Checkout
          </button>
          <button
            style={{
              backgroundColor: '#4267B2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 15px',
              fontSize: '16px',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.1s',
              margin: '10px',
            }}
            onClick={() => handleFetchData('data2')}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
const CheckoutCollapseComponent = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: '#f0f2f5',
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const handleFetchData = (dataKey) => {
    console.log(`Fetching data for ${dataKey}`);
    // 在这里添加获取数据的逻辑
  };

  return (
    <Collapse
      className="custom-CheckoutCollapseComponent"
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle, handleFetchData)}
    />
  );
};
export default CheckoutCollapseComponent;
