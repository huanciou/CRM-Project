import { InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  InputNumber,
  Input,
  Select,
  Space,
  Upload,
  Divider,
  message,
} from 'antd';
import DividerComponent from './DividerComponent';

const apiUrl = process.env.REACT_APP_API_URL;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 6,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormComponent = () => {
  const formTag = Form.useForm()[0];
  const formCategory = Form.useForm()[0];
  const formMenuItem = Form.useForm()[0];
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const onFinishTag = async (values) => {
    console.log('Tag Values: ', values);
    try {
      const response = await fetch(`${apiUrl}/api/1.0/admin/createMenuTags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const resultText = await response.text();
        message.success('Tag submitted successfully: ' + resultText);
        formTag.resetFields();
      } else {
        message.error('Failed to submit tag');
      }
    } catch (error) {
      console.error('Error submitting tag:', error);
      message.error('Error submitting tag');
    }
  };

  const onFinishCategory = async (values, form) => {
    console.log('Category Values:', values);
    try {
      const response = await fetch(
        `${apiUrl}/api/1.0/admin/createMenuCategory`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );
      if (response.ok) {
        const resultText = await response.text();
        message.success('Category submitted successfully: ' + resultText);
        formCategory.resetFields();
      } else {
        message.error('Failed to submit category');
      }
    } catch (error) {
      console.error('Error submitting category:', error);
      message.error('Error submitting category');
    }
  };

  const onFinishMenuItem = async (values, form) => {
    console.log('Menu Item Values:', values);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== 'main_image' && key !== 'images') {
        formData.append(key, values[key]);
      }
    });

    if (values.main_image && values.main_image.length > 0) {
      formData.append('main_image', values.main_image[0].originFileObj);
    }
    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append('images', file.originFileObj);
      });
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/1.0/admin/createMenuContents`,
        {
          method: 'POST',
          body: formData, // 使用 FormData 作为请求体
        },
      );

      if (response.ok) {
        const resultText = await response.text();
        message.success('Item submitted successfully: ' + resultText);
        formMenuItem.resetFields();
      } else {
        message.error('Failed to submit menu item');
      }
    } catch (error) {
      console.error('Error submitting menu item:', error);
      message.error('Error submitting menu item');
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${apiUrl}/api/1.0/admin/fetchMenuCategories`,
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };

    const fetchTags = async () => {
      const response = await fetch(`${apiUrl}/api/1.0/admin/fetchMenuTags`);
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div>
      <DividerComponent>
        <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
          新增標籤
        </h2>
      </DividerComponent>
      <Form
        form={formTag}
        name="createMenuTags"
        {...formItemLayout}
        onFinish={onFinishTag}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
          'color-picker': null,
        }}
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item label="Tag" name="tag">
          <Input placeholder="⋯⋯" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <DividerComponent>
        <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
          新增種類
        </h2>
      </DividerComponent>

      <Form
        form={formCategory}
        name="createMenuCategory"
        {...formItemLayout}
        onFinish={onFinishCategory}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
          'color-picker': null,
        }}
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item label="Category" name="category">
          <Input placeholder="⋯⋯" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <DividerComponent>
        <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
          新增餐點
        </h2>
      </DividerComponent>

      <Form
        form={formMenuItem}
        name="createMenuContents"
        {...formItemLayout}
        onFinish={onFinishMenuItem}
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          name="tags"
          label="標籤選擇"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your tag!',
            },
          ]}
        >
          <Select placeholder="⋯⋯" allowClear>
            {tags.map((tag) => (
              <Option key={tag._id} value={tag.tags}>
                {tag.tags}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="category"
          label="種類選擇"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your category!',
            },
          ]}
        >
          <Select placeholder="⋯⋯" allowClear>
            {categories.map((category) => (
              <Option key={category._id} value={category.category}>
                {category.category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="名稱"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter the name!',
            },
          ]}
        >
          <Form.Item name="name">
            <Input placeholder="⋯⋯" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="商品描述"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your category!',
            },
          ]}
        >
          <Form.Item name="story">
            <Input placeholder="⋯⋯" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="價格"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your category!',
            },
          ]}
        >
          <Form.Item name="price" noStyle>
            <InputNumber min={1} max={1000000} initialvalues={0} />
          </Form.Item>
          <span
            className="ant-form-text"
            style={{
              marginLeft: 50,
            }}
          ></span>
        </Form.Item>

        <Form.Item
          label="主要圖片"
          name="main_image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="次要圖片"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <Divider />
    </div>
  );
};
export default FormComponent;
