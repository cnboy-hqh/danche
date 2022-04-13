/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {

  handleSubmit = async () => {
    console.log(this.myForm)
    // let { validateFields, getFieldsValue } = this.myForm;
    let userInfo = this.myForm.getFieldsValue();
    console.log(userInfo)
    try {
      const values = await this.myForm.validateFields(['username', 'password']);
      console.log(values);
      message.success(`${userInfo.username}恭喜你，您通过本次表单学习，您的密码为${userInfo.password}`)
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  onFinish = values => {
    message.success(`${values.username}恭喜你，您通过本次表单学习，您的密码为${values.password}`)
  };

  render() {
    return (
      <div>
        <Card title="登录行内表单" className='card-wrap'>
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入密码" />
            </Form.Item>
            <Button type='primary'>登录</Button>
          </Form>
        </Card>
        <Card title="登录水平表单" className='card-wrap'>
          <Form style={{ width: 300 }} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your name',
                },
                {
                  min: 5, max: 10,
                  message: '长度不在范围内'
                },
                {
                  pattern: new RegExp('^\\w+$', 'g'),
                  message: '用户名必须为字母或数字'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="username" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
            >
              <Input prefix={<LockOutlined className="username" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                initialValue={true}
                style={{ float: 'left' }}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <a href="#" style={{ float: 'right' }}>忘记密码</a>
            </Form.Item>
            <Button type='primary' htmlType="submit">登录</Button>
          </Form>
        </Card>
        <Card title="登录水平表单2" className='card-wrap'>
          <Form style={{ width: 300 }} ref={c => this.myForm = c}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your name',
                },
                {
                  min: 5, max: 10,
                  message: '长度不在范围内'
                },
                {
                  // pattern: /^\w+$/g,
                  pattern: new RegExp('^\\w+$', 'g'),
                  message: '用户名必须为字母或数字'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="username" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
            >
              <Input prefix={<LockOutlined className="username" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                initialValue={true}
                style={{ float: 'left' }}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <a href="#" style={{ float: 'right' }}>忘记密码</a>
            </Form.Item>
            <Button type='primary' onClick={this.handleSubmit}>登录</Button>
          </Form>
        </Card>
      </div>
    )
  }
}
