import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <EditOutlined />,
              label: '菜單設置',
            },
            {
              key: '2',
              icon: <PlusOutlined />,
              label: '點餐',
            },
            {
              key: '3',
              icon: <EditOutlined />,
              label: '結帳隊列',
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: '儀表板',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '32px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 560,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Huan Design © 2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
