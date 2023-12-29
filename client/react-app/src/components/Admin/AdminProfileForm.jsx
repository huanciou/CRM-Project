import React, { useEffect } from 'react';
import { Button, Form, Input, Space, message, Divider } from 'antd';
import AvatarComponent from './AvatarComponent';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AdminProfileForm = ({ profileData, onRefresh }) => {
  const [form] = Form.useForm();
  const readOnlyForm = Form.useForm()[0];
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    readOnlyForm.setFieldsValue(profileData);
  }, [profileData, readOnlyForm]);

  const onFinish = (values) => {
    const dataToSend = {
      name: values.name,
      location: values.location,
      phone: values.phone,
    };

    fetch(`${apiUrl}/api/1.0/admin/setup`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        message.success('更新成功');
        form.resetFields();
        onRefresh();
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('更新失败');
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ maxHeight: '80vh' }}>
      <AvatarComponent profileData={profileData} />
      <Divider>目前資訊</Divider>
      <Form {...layout} form={readOnlyForm} initialValues={profileData}>
        <Form.Item name="name" label="Name">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input readOnly />
        </Form.Item>
      </Form>
      <Divider>更改資訊</Divider>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input editable name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[
            { required: true, message: 'Please input editable location' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please input editable phone number' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProfileForm;
