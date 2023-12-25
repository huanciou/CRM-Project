import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import AdminProfileComponent from './AdminProfileComponent';
import '../../styles/style.css';

const getKeyFromPath = (path) => {
  const mapping = {
    '/admin/menuSetup': '1',
    '/admin/order': '2',
    '/admin/checkout': '3',
    '/admin/dashboard': '4',
  };
  return mapping[path] || '1';
};

const { Header, Sider, Content, Footer } = Layout;
const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentKey = getKeyFromPath(location.pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ position: 'relative' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          items={[
            {
              key: '1',
              icon: <EditOutlined />,
              label: <NavLink to="/admin/menuSetup">菜單設置</NavLink>,
            },
            {
              key: '2',
              icon: <PlusOutlined />,
              label: <NavLink to="/admin/order">點餐</NavLink>,
            },
            {
              key: '3',
              icon: <ShoppingCartOutlined />,
              label: <NavLink to="/admin/checkout">結帳隊列</NavLink>,
            },
            {
              key: '4',
              icon: <DashboardOutlined />,
              label: <NavLink to="/admin/dashboard">儀表板</NavLink>,
            },
            {
              key: '5',
              icon: <HomeOutlined />,
              label: <AdminProfileComponent />,
            },
            {
              key: '6',
              icon: <UserOutlined />,
              label: <NavLink to="/admin/login">登入</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 100,
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
            minHeight: 900,
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
