import React from 'react';
import { Divider } from 'antd';

const DividerComponent = ({ children }) => (
  <>
    <Divider
      orientation="left"
      orientationMargin={0}
      style={{ marginTop: 10, marginBottom: 60 }}
    >
      {children}
    </Divider>
  </>
);
export default DividerComponent;
