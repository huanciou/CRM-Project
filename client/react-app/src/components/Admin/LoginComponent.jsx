import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

const LoginComponent = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const onFinish = (values) => {
    fetch(`${apiUrl}/api/1.0/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // cookies accepted
      body: JSON.stringify({
        account: values.account,
        password: values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('ok');
          message.success('Login successful!');
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        console.log('ok2');
        navigate('/admin/menuSetup', { replace: true });
      })
      .catch((error) => {
        console.error('Login failed:', error);
        message.error('Login failed');
      });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
        account: 'admin02',
        password: '123',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="account"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginComponent;
