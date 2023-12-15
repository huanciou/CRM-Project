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
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

const FormComponent = () => (
  <div>
    <DividerComponent>
      <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
        新增標籤
      </h2>
    </DividerComponent>
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
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
      <Form.Item label="Input">
        <Form.Item name="">
          <Input placeholder="⋯⋯" />
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

    <DividerComponent>
      <h2 className="ant-form-text" style={{ marginLeft: 20 }}>
        新增種類
      </h2>
    </DividerComponent>

    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
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
      <Form.Item label="Input">
        <Form.Item name="">
          <Input placeholder="⋯⋯" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 120,
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
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
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
        name="select"
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
        name="select"
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
        name="a"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter the name!',
          },
        ]}
      >
        <Form.Item name="a">
          <Input placeholder="⋯⋯" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="商品描述"
        name=""
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}
      >
        <Form.Item name="">
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
        <Form.Item name="input-number" noStyle>
          <InputNumber min={1} max={1000000} defaultValue={0} />
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
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: 'Please upload one image at least!',
            },
          ]}
        >
          <Upload.Dragger name="files" action="/upload.do" listType="picture">
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
