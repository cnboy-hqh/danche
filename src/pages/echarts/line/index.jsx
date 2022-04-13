import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class index extends Component {

  getOption1 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1500, 2300, 2240, 3000, 2600, 1470, 1350],
          type: 'line'
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      legend:{
        top:"30px"
      },
      tooltip: {
        trigger: 'axis',
        // formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'OFO订单量',
        type: 'line',
        data: [1200, 3000, 4500, 3000, 2000, 1200, 800]
      }, {
        name: '摩拜订单量',
        type: 'line',
        data: [1000, 2000, 5500, 6000, 8000, 10000, 12000]
      }]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      tooltip: {
        trigger: 'axis',
        // formatter:'{a}<br/>{b}:{c}({d}%)',
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985'
        //   }
        // },
      },
      xAxis: {
        type: 'category',
        boundaryGap:false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },

      yAxis: {
        type: 'value'
      },
      series:[{
        name:'订单量',
        type:'line',
        data:[2200,3000,4500,3000,2000,1200,800],
        areaStyle:{}
      }]
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="折线图一">
          <ReactEcharts option={this.getOption1()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线图二">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线图三">
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
