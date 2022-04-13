import React, { Component } from 'react'
import { Card, Form,  Button, Modal, message } from 'antd';
import axios from './../../axios';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';
import Utils from '../../utils/utils';

export default class Order extends Component {

  state = {
    selectedRowKeys: [],
    selectedRowIds: [],
    isOrderVisible:false,
    orderInfo:[]
  }

  params = {
    page: 1
  }

  formList = [{
    type:'SELECT',
    label:'城市',
    field:'city',
    placeholder:'全部',
    initialValue:'1',
    width:80,
    list:[{
      id:'0', name:'全部',
    },{
      id:'1', name:'北京',
    },{
      id:'2', name:'上海',
    },{
      id:'3', name:'天津',
    }]
  },{
    type:'时间查询',
    width:140
  },{
    type:'SELECT',
    label:'订单状态',
    field:'order_status',
    placeholder:'全部',
    initialValue:'1',
    width:100,
    list:[{
      id:'0', name:'全部',
    },{
      id:'1', name:'进行中',
    },{
      id:'2', name:'结束行程',
    }]
  }]

  handleFilter = params => {
    this.params = params;
    this.requestList();
  }

  requestList = () => { 
    axios.requestList(this,'/order/list',this.params,true)
  }

  handleFinish = () => {
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title:'信息',
        content:'请选择一条订单进行结束'
      })
      return;
    }
    axios.ajax({
      url:"/order/ebike_info",
      data:{
        params:{
          orderId:item.id
        }
      }
    }).then(res=>{
      if(res.code==="0"){
        console.log(res)
        this.setState({
          isOrderVisible:true,
          orderInfo:res.result
        })
      }
    })
  }

  handleFinishOrder = () => {
    let item = this.state.selectedItem
    axios.ajax({
      url:"/order/ebike_info",
      data:{
        params:{
          orderId:item.id
        }
      }
    }).then(res=>{
      if(res.code==="0"){
        message.success("订单结束成功")
        this.setState({
          isOrderVisible:false,
        })
        this.requestList();
      }
    })
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title:'信息',
        content:'请先选择一条订单'
      })
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`,'_blank')
  }

  componentDidMount() {
    this.requestList()
  }

  render() {
    const { dataSource, pagination,selectedRowKeys,selectedIds,selectedItem } = this.state
    const columns = [{
      title: '订单编号', 
      dataIndex: "order_sn"
    }, {
      title: '车辆编号',
      dataIndex: "bike_sn"
    }, {
      title: '用户名',
      dataIndex: "user_name"
    }, {
      title: '手机号',
      dataIndex: "mobile"
    }, {
      title: '里程',
      dataIndex: "distance",
      render(distance) {
        return distance / 1000 + 'km';
      }
    }, {
      title: '行驶时长',
      dataIndex: "total_time"
    }, {
      title: '状态',
      dataIndex: "status",
      render(status) {
        return status === 1 ? "进行中" : "结束行程"
      }
    }, {
      title: '开始时间',
      dataIndex: "start_time"
    }, {
      title: '结束时间',
      dataIndex: "end_time"
    }, {
      title: '订单金额',
      dataIndex: "total_fee"
    }, {
      title: '实付金额',
      dataIndex: "user_pay"
    }]

    const formItemLayout = {
      labelCol: {
        span:5
      },
      wrapperCol: {
        span:19
      }
    }

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type='primary' style={{ margin: "0 10px" }} onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary' onClick={this.handleFinish}>结束订单</Button>
        </Card>
        <ETable
          updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          selectedRowKeys = {selectedRowKeys}
          selectedIds={selectedIds}
          selectedItem={selectedItem}
          // rowSelection="checkbox"
        />
        <Modal
          title="结束订单"
          visible={this.state.isOrderVisible}
          onCancel={() => {
            this.setState({
              isOrderVisible:false
            })
          }}
          onOk={this.handleFinishOrder}
        >
          <Form {...formItemLayout}>
            <Form.Item label="车辆编号">
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label="剩余电量">
              {this.state.orderInfo.battery+ "%"} 
            </Form.Item>
            <Form.Item label="行程开始时间">
              {this.state.orderInfo.start_time}
            </Form.Item> 
            <Form.Item label="当前位置">
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
Order.displayName = "myorder"