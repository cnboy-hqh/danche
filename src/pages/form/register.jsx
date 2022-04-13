/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Card, Form, Input, Button, Radio, Switch, DatePicker, InputNumber, Select, TimePicker, Upload, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
export default class Login extends Component {

  state = {}

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 20
      }
    }

    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }

    const rowObject = {
      minRows: 4, maxRows: 6
    }

    const { imageUrl, loading } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    return (
      <div>
        <Card title="注册表单" className='card-wrap'>
          <Form layout="horizontal" {...formItemLayout}>
            <Form.Item
              label="用户名"
              name="username"
              rules={
                [{ required: true, message: 'Please input your name' }]
              }
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item label="性别" name="gender">
              <Radio.Group>
                <Radio value="nan">男</Radio>
                <Radio value="nv">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="年龄" name="age" initialValue="18">
              <InputNumber />
            </Form.Item>
            <Form.Item label="当前状态" name="status" initialValue="1">
              <Select showSearch>
                <Option value="0">咸鱼一条</Option>
                <Option value="1">风华浪子</Option>
                <Option value="2">北大才子一枚</Option>
                <Option value="3">创业者</Option>
              </Select>
            </Form.Item>
            <Form.Item label="爱好" name="interest" initialValue={['1', '3']}>
              <Select
                showSearch
                mode="multiple"
              >
                <Option value="0">跑步</Option>
                <Option value="1">跳舞</Option>
                <Option value="2">唱歌</Option>
                <Option value="3">爬山</Option>
                <Option value="4">打乒乓球</Option>
                <Option value="5">打羽毛球</Option>
                <Option value="6">踢足球</Option>
                <Option value="7">跳广场舞</Option>
              </Select>
            </Form.Item>
            <Form.Item label="是否已婚" name="isMarried" >
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label="生日" name="birthday" initialValue={moment('2021-10-03 17:26')}>
              <DatePicker
                format='YYYY-MM-DD HH:mm:ss'
              />
            </Form.Item>
            <Form.Item label="联系地址" name="address" initialValue="北京市海淀区奥林匹克公园">
              <TextArea
                autoSize={rowObject}
              />
            </Form.Item>
            <Form.Item label="早起时间" name="time">
              <TimePicker />
            </Form.Item>
            <Form.Item label="头像" name="userImg">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item {...offsetLayout}>
              <Checkbox defaultChecked>
                我已经阅读过<a href="#">慕课协议</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...offsetLayout}>
              <Button type='primary'>注册</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
