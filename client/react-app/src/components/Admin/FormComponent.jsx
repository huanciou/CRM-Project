import { InboxOutlined } from '@ant-design/icons';
import React from 'react';
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
  return e?.fileList;
};

const beforeUpload = (file) => {
  // const isImage = file.type.startsWith('image/');
  // if (!isImage) {
  //   message.error('您只能上傳圖片文件！');
  // }
  // return isImage || Upload.LIST_IGNORE;
  return false;
};

const onFinishTag = async (values) => {
  console.log('Tag Values: ', values);
  try {
    const response = await fetch(
      'http://localhost:3000/api/1.0/admin/createMenuTags',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    );
    if (response.ok) {
      console.log('Tag submitted successfully');
    } else {
      console.error('Failed to submit tag');
    }
  } catch (error) {
    console.error('Error submitting tag:', error);
  }
};

const onFinishCategory = async (values) => {
  console.log('Category Values:', values);
  try {
    const response = await fetch(
      'http://localhost:3000/api/1.0/admin/createMenuTags',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    );
    if (response.ok) {
      console.log('Tag submitted successfully');
    } else {
      console.error('Failed to submit tag');
    }
  } catch (error) {
    console.error('Error submitting tag:', error);
  }
};

const onFinishMenuItem = async (values) => {
  console.log('Menu Item Values:', values);
};

const FormComponent = () => (
  <div>
    <DividerComponent>
      <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
        新增標籤
      </h2>
    </DividerComponent>
    <Form
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
      name="createMenuCategory"
      {...formItemLayout}
      onFinish={onFinishCategory}
      action="http://localhost:3000/api/1.0/admin/createMenuCategory"
      method="POST"
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
      name="createMenuContents"
      {...formItemLayout}
      onFinish={onFinishMenuItem}
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
        <Select placeholder="⋯⋯">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
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
        <Select placeholder="⋯⋯">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
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

      <Form.Item label="圖片上傳">
        <Form.Item
          // valuePropName="fileList"
          // getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: 'Please upload one image at least!',
            },
          ]}
        >
          <Upload.Dragger
            name="main_image"
            listType="picture"
            beforeUpload={beforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">點擊或拖曳圖片來上傳</p>
            <p className="ant-upload-hint">上限為單張圖片</p>
          </Upload.Dragger>
        </Form.Item>
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
export default FormComponent;
