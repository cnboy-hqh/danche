import React, { Component } from 'react'
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class index extends Component {

  getOption1 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 'right'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            {
              value:1000,
              name:'Mon'
            },{
              value:1200,
              name:'Tue'
            },{
              value:1400,
              name:'Wed'
            },{
              value:1500,
              name:'Thu'
            },{
              value:2000,
              name:'Fri'
            },{
              value:2600,
              name:'Sat'
            },{
              value:2500,
              name:'Sun'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x:'center'
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      legend: {
        right: 'right',
        orient: 'vertical'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['40%', '70%'],
          data:[{
            value:1000,
            name:'Mon'
          },{
            value:1200,
            name:'Tue'
          },{
            value:1400,
            name:'Wed'
          },{
            value:1500,
            name:'Thu'
          },{
            value:2000,
            name:'Fri'
          },{
            value:2600,
            name:'Sat'
          },{
            value:2500,
            name:'Sun'
          }],
        }
      ]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      legend: {
        right:"right",
        top:"30px",
        orient: 'vertical'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data:[{
            value:1000,
            name:'Mon'
          },{
            value:1200,
            name:'Tue'
          },{
            value:1400,
            name:'Wed'
          },{
            value:1500,
            name:'Thu'
          },{
            value:2000,
            name:'Fri'
          },{
            value:2600,
            name:'Sat'
          },{
            value:2500,
            name:'Sun'
          }].sort((a,b) => a.value-b.value),
        }
      ]
    };
    return option;
  }

  render() {
    return (
      <div>
        <Card title="饼图-基本图">
          <ReactEcharts option={this.getOption1()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="饼图-环形图">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="饼图——南丁格尔图">
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
