import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';

export default class basicTable extends Component {

  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys:[0,1]
  }

  params = {
    page:1
  }

  componentDidMount() {
    const dataSource = [{
      id: 0,
      userName: "Jack",
      sex: "1",
      state: "1",
      interest: "1",
      birthday: "2000-01-01",
      address: "北京市海淀区奥林匹克公园",
      time: "09:00"
    }, {
      id: 1,
      userName: "Tom",
      sex: "1",
      state: "1",
      interest: "1",
      birthday: "2000-01-01",
      address: "北京市海淀区奥林匹克公园",
      time: "09:00"
    }, {
      id: 2,
      userName: "Susan",
      sex: "1",
      state: "1",
      interest: "1",
      birthday: "2000-01-01",
      address: "北京市海淀区奥林匹克公园",
      time: "09:00"
    }]
    dataSource.map((item,index) => item.key = index)
    this.setState({
      dataSource
    })
    this.request();
  }

  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then(res => {
      res.result.list.map((item,index) => item.key = index)
      if(res.code==='0'){
        this.setState({
          dataSource2: res.result.list,
          selectedRowKeys:[],
          selectedRows:null,
          pagination: Utils.pagination(res,current => {
            console.log(current)
            _this.params.page = current;
            // console.log(_this)
            this.request();
            // console.log(this)
          })//第二个参数是点击下页时获得的页码
        })
      }
    })
  }

  onRowClick = (record,index) => {
    let selectKey = [index];
    Modal.info({
      title:"信息",
      content:`用户名：${record.userName}, key：${record.key}`
    })
    this.setState({
      selectedRowKeys:selectKey,  //选中当前行的key值
      selectedItem:record     //选中当前行信息
    })
  }

  // 多选执行删除动作
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item=>
      ids.push(item.id)
    )
    Modal.confirm({
      title:"删除提示",
      content:`你确定要删除这些数据吗？${ids.join(',')}`,
      onOk:()=>{
        message.success('删除成功')
        this.request();
      }
    })
  }

  render() {
    const { dataSource, dataSource2, selectedRowKeys, pagination} = this.state;
    const columns = [{
      title: "id",
      dataIndex: "id"
    }, {
      title: "用户名",
      dataIndex: "userName"
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
        let config = {
          '1': '游泳',
          '2': '跳舞',
          '3': '唱歌',
          '4': '打篮球',
          '5': '跑步',
          '6': '踢足球',
          '7': '爬山',
          '8': '看书',
          '9': '追剧'
        }
        return config[interest];
      }
    }, {
      title: "生日",
      dataIndex: "birthday"
    }, {
      title: "地址",
      dataIndex: "address"
    }, {
      title: "早起时间",
      dataIndex: "time"
    }]

    const rowSelection = {
      type:"radio",
      selectedRowKeys  //指定选中项的 key 数组，需要和 onChange 进行配合
    }

    const rowCheckSelection = {
      type:"checkbox",
      selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        <Card title="基础表格" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
            rowSelection={rowSelection}  //单选多选
            onRow={(record,index) => {
              return {
                onClick: ()=>{
                  this.onRowClick(record,index)
                }
              };
            }}
          />
        </Card>
        <Card title="Mock-复选" className='card-wrap'>
          <div style={{marginBottom:10}}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
            rowSelection={rowCheckSelection}
          />
        </Card>
        <Card title="Mock-表格分页" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource2}
            pagination={pagination}
          />
        </Card>
      </div>
    )
  }
}
