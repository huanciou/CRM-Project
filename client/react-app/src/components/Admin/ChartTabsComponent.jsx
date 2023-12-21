import React from 'react';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';

const tags = ['當日營業額', '熱門標籤', '用戶排行'];

const ChartTabsComponent = ({ onChange }) => (
  <Tabs
    style={{ padding: 20 }}
    defaultActiveKey="1"
    tabBarGutter={50}
    onChange={onChange}
    items={[BarChartOutlined, LineChartOutlined, PieChartOutlined].map(
      (Icon, i) => {
        const id = String(i + 1);
        return {
          key: id,
          label: tags[i],
          icon: <Icon />,
        };
      },
    )}
  />
);

export default ChartTabsComponent;
