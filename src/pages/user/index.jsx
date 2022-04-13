import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ETable from './../../components/ETable';
import BaseForm from './../../components/BaseForm';
import axios from './../../axios';
import Utils from './../../utils/utils';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
export default class User extends Component {

  state = {
    isVisible: false,
    title: ""
  }

  params = {
    page: 1
  }

  handleFilter = params => {
    this.params = params;
    this.requestList();
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, "/user/list", this.params, true)
  }

  handleOperate = type => {
    let item = this.state.selectedItem;
    if (type === 'create') {
      this.setState({
        type,
        title: "创建员工",
        isVisible: true
      })
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        type,
        title: "编辑员工",
        isVisible: true,
        userInfo: item
      })
    } else if (type === "detail") {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        type,
        title: "员工详情",
        isVisible: true,
        userInfo: item
      })
    }else{
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      Modal.confirm({
        title:"确认删除",
        content:"是否要删除当前选中的员工",
        onOk:()=>{
          axios.ajax({
            url:"/user/delete",
            data:{
              params:{
                id:item.id
              }
            }
          }).then(res=>{
            if(res.code==='0'){
              this.setState({
                isVisible:false,
                selectedRowKeys:[]
              })
              this.requestList();
            }
          })
        }
      })
    }
  }

  formList = [{
    type: 'INPUT',
    label: '用户名',
    field: 'user_name',
    placeholder: '请输入用户名',
    width: 120,
  }, {
    type: 'INPUT',
    label: '手机号',
    field: 'user_mobile',
    placeholder: '请输入手机号',
    width: 120,
  }, {
    type: 'DATE',
    label: '请选择入职日期',
    field: 'user_date',
    placeholder: '请选择结束日期',
    width: 140,
  }]

  handleSubmit = () => {
    let type = this.state.type;
    let userInfo = this.userForm.userForm.getFieldsValue();
    axios.ajax({
      url: type === "create" ? "/user/add" : "/user/edit",
      data: {
        params: userInfo
      }
    }).then(res => {
      if (res.code === '0') {
        this.setState({
          isVisible: false
        })
        this.requestList();
        // this.userForm.userForm.resetFields();
      }
    })
  }

  render() {
    const { dataSource, pagination, title, isVisible, selectedItem, selectedRowKeys,type } = this.state;
    const columns = [{
      title: "id",
      dataIndex: "id"
    }, {
      title: "用户名",
      dataIndex: "username"
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      }
    }, {
      title: "状态",
      dataIndex: "state",
      render(state) {
        let config = {
          '1': '咸鱼一条',
          '2': '风华浪子',
          '3': '北大才子',
          '4': '百度FE',
          '5': '创业者'
        }
        return config[state];
      }
    }, {
      title: "爱好",
      dataIndex: "interest",
      render(interest) {
        return {
          '1': "跑步",
          '2': "跳舞",
          '3': "唱歌",
          '4': "打台球",
          '5': "打羽毛球",
          '6': "踢足球",
          '7': "爬山",
          '8': "骑行",
        }[interest]
      }
    }, {
      title: "婚否",
      dataIndex: "isMarried",
      render(isMarried) {
        return isMarried === 1 ? "是" : "否"
      }
    }, {
      title: "生日",
      dataIndex: "birthday"
    }, {
      title: "联系地址",
      dataIndex: "address"
    }, {
      title: "早起时间",
      dataIndex: "time"
    }]

    let footer ={}
    if(type==="detail"){
      footer={
        footer:null
      }
    }

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }} className='operate-wrap'>
          <Button icon={<PlusOutlined />} type="primary" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button icon={<EditOutlined />} type="primary" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button icon={<DeleteOutlined />} type="primary" onClick={() => this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            selectedRowKeys={selectedRowKeys}
            selectedItem={selectedItem}
          />
        </div>
        <Modal
          title={title}
          visible={isVisible}
          onCancel={() => {
            this.userForm.userForm.resetFields();
            this.setState({
              isVisible: false
            })
          }}
          onOk={this.handleSubmit}
          {...footer}
        >
          <UserForm
            type={this.state.type}
            ref={c => this.userForm = c}
            userInfo={this.state.userInfo}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component {
  getState = state => {
    return {
      "1": "咸鱼一条",
      "2": "风华浪子",
      "3": "北大才子一枚",
      "4": "百度FE",
      "5": "创业者",
    }[state]
  }
  

  render() {
    let { type, userInfo } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return (
      <Form {...formItemLayout} ref={c => this.userForm = c}>
        <Form.Item label="用户名" name="userName" initialValue={userInfo.username}>
          {
            type === "detail" ? userInfo.username :
              <Input placeholder="请输入姓名" />
          }
        </Form.Item>
        <Form.Item label="性别" name="sex" initialValue={userInfo.sex}>
          {
            type === "detail" ? userInfo.sex===1?"男":"女" :
              <Radio.Group>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
          }
        </Form.Item>
        <Form.Item label="状态" name="state" initialValue={userInfo.state}>
          {
            type === "detail" ? this.getState(userInfo.state) :
              <Select>
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子</Option>
                <Option value={3}>北大才子</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
          }
        </Form.Item>
        <Form.Item label="生日" name='birthday' initialValue={moment(userInfo.birthday)}>
          {
            type === "detail" ? userInfo.birthday:
              <DatePicker />
          }
        </Form.Item>
        <Form.Item label="地址" name='address' initialValue={userInfo.address}>
          {
            type === "detail" ? userInfo.address:
            <TextArea rows={3} placeholder="请输入联系地址" />
          }
        </Form.Item>
      </Form>
    )
  }
}