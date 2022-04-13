import React, { Component } from 'react'
import { Card, Table, Badge, Button, Modal, message } from 'antd';
import axios from './../../axios';

export default class basicTable extends Component {

  state={

  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios.ajax({
      url:'/table/high/list',
      data:{
        param:{
          page:this.params.data
        }
      }
    }).then(res=>{
      if(res.code==='0'){
        res.result.list.map((item,index) => item.key = index)
        this.setState({
          dataSource:res.result.list
        })
      }
    })
  }

  handleDelete = item => {
    // console.log(item)
    let id = item.id
    let userName = item.userName
    Modal.confirm({
      title:"确认",
      content:`您确认要删除(id:${id} 姓名:${userName})这条数据吗？`,
      onOk: () => {
        message.success("删除成功");
        this.request()
      }
    })
  }

  render() {
    const { dataSource } = this.state;
    const columns = [{
      title: "id",
      dataIndex: "id",
      width:80
    }, {
      title: "用户名",
      dataIndex: "userName",
      width:80
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      },
      width:80
    }, {
      title: "状态",
      width:80,
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
      width:80,
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
      dataIndex: "birthday",
      width:120
    }, {
      title: "地址",
      dataIndex: "address",
      width:120
    }, {
      title: "早起时间",
      dataIndex: "time",
      width:80
    }]

    const columns2 = [{
      title: "id",
      dataIndex: "id",
      width:80,
      fixed:"left"
    }, {
      title: "用户名",
      dataIndex: "userName",
      width:80,
      fixed:"left"
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      },
      width:80
    }, {
      title: "状态",
      width:80,
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
      width:80,
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
      dataIndex: "birthday",
      width:120
    }, {
      title: "生日",
      dataIndex: "birthday1",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday2",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday3",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday4",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday5",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday6",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday7",
      width:120
    },{
      title: "生日",
      dataIndex: "birthday8",
      width:120
    },{
      title: "地址",
      dataIndex: "address",
      width:120
    }, {
      title: "早起时间",
      dataIndex: "time",
      width:80,
      fixed:"right"
    }]

    const columns3 = [{
      title: "id",
      dataIndex: "id",
      width:80
    }, {
      title: "用户名",
      dataIndex: "userName",
      width:80
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      },
      width:80
    }, {
      title: "年龄",
      dataIndex: "age",
      width:80,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },{
      title: "状态",
      width:80,
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
      width:80,
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
      dataIndex: "birthday",
      width:120
    }, {
      title: "地址",
      dataIndex: "address",
      width:120
    }, {
      title: "早起时间",
      dataIndex: "time",
      width:80
    }]

    const columns4 = [{
      title: "id",
      dataIndex: "id",
      width:80
    }, {
      title: "用户名",
      dataIndex: "userName",
      width:80
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      },
      width:80
    }, {
      title: "年龄",
      dataIndex: "age",
      width:80,
    },{
      title: "状态",
      width:80,
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
      width:80,
      dataIndex: "interest",
      render(interest) {
        let config = {
          '1': <Badge status='success' text='游泳' />,    //Badge 徽标数
          '2': <Badge status='error' text='跳舞' />,
          '3': <Badge status='default' text='唱歌' />,
          '4': <Badge status='processing' text='打篮球' />,
          '5': <Badge status='default' text='跑步' />,
          '6': <Badge status='warning' text='踢足球' />,
          '7': <Badge status='success' text='爬山' />,
          '8': <Badge status='error' text='看书' />,
          '9': <Badge status='warning' text='追剧' />,
        }
        return config[interest];
      }
    }, {
      title: "生日",
      dataIndex: "birthday",
      width:120
    }, {
      title: "地址",
      dataIndex: "address",
      width:120
    }, {
      title: "早起时间",
      dataIndex: "time",
      width:80
    },{
      title:"操作",
      dataIndex:"operate",
      render: (text,item)=>  
        <Button onClick={() => this.handleDelete(item)}>删除</Button>
    }]

    return (
      <div>
        <Card title="头部固定" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false} 
            scroll={{ y: 240 }}  //头部固定
          />
        </Card>
        <Card title="左侧固定" className='card-wrap'>
          <Table
            bordered
            columns={columns2}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 1300 }}  
          />
        </Card>
        <Card title="表格排序" className='card-wrap'>
          <Table
            bordered
            columns={columns3}
            dataSource={dataSource}
            pagination={false}
          />
        </Card>
        <Card title="操作按钮" className='card-wrap'>
          <Table
            bordered
            columns={columns4}
            dataSource={dataSource}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}
