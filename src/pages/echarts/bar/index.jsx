import React, { Component } from 'react'
import { Card } from 'antd';
// import * as echarts from 'echarts/core';
// import { BarChart } from 'echarts/charts';
// import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';

export default class index extends Component {

  getOption1 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'订单量',
          type: 'bar',
          data: [1300, 1400, 1800, 3000, 2000, 1500, 1300]
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      legend: {
        data:["OFO","摩拜","小蓝"]
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'OFO',
          type: 'bar',
          data:[2000,3000,5500,7000,8000,12000,20000]
        },{
          name:'摩拜',
          type: 'bar',
          data:[1500,3000,4500,6000,8000,10000,15000]
        },{
          name:'小蓝',
          type: 'bar',
          data:[1000,2000,2500,4000,6000,7000,8000]
        }
      ]
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="柱状图表之一">
          <ReactEcharts option={this.getOption1()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="柱状图表之二">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
