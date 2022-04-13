import React, { Component } from 'react';
import { Card } from 'antd';
import BaseForm from './../../components/BaseForm';
import axios from '../../axios';

export default class index extends Component {

  state={
    total_count:""
  }

  handleFilterSubmit = filterParams => {
    this.params = filterParams
    this.requestList();
  }

  componentDidMount(){
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url:"/map/bike_list",
      data:{
        params:{
          page:this.params
        }
      }
    }).then(res=>{
      if(res.code==='0'){
        this.setState({
          total_count:res.result.total_count
        })
        this.renderMap(res);
      }
    })
  }

  renderMap = res => {
    let list = res.result.route_list;
    this.map = new window.BMapGL.Map("container");
    let gps1 = list[0].split(",");
    let gps2 = list[list.length-1].split(",");
    let startPoint = new window.BMapGL.Point(gps1[0],gps1[1]);
    let endPoint = new window.BMapGL.Point(gps2[0],gps2[1]);
    this.map.centerAndZoom(endPoint,11);

    let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
      imageSize:new window.BMapGL.Size(36,42),
      anchor:new window.BMapGL.Size(18,42)
    })
    let startMarker = new window.BMapGL.Marker(startPoint,{icon:startPointIcon});  
    this.map.addOverlay(startMarker);
    let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png",new window.BMapGL.Size(36,42),{
      imageSize:new window.BMapGL.Size(36,42),
      anchor:new window.BMapGL.Size(36,42)
    })
    let endMarker = new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
    this.map.addOverlay(endMarker);

    // 绘制路线图
    let routeList = [];
    list.map(item => {
      let p = item.split(",")
      routeList.push(new window.BMapGL.Point(p[0],p[1]));
      return routeList
    })
    let Polyline = new window.BMapGL.Polyline(routeList,{
      strokeColor:'#ef4136',
      strokeWeight:2
    })
    this.map.addOverlay(Polyline);
    // 绘制服务区
    let servicePointList  = [];
    let serviceList  = res.result.service_list;
    serviceList.map(item => {
      servicePointList.push(new window.BMapGL.Point(item.lon,item.lat));
      return servicePointList
    })
    // let polyServiceLine  = new window.BMapGL.Polyline(servicePointList,{
    //   strokeColor:'#ef4136',
    //   strokeWeight:2,
    //   fillColor:"#ff8605",
    // })
    // this.map.addOverlay(polyServiceLine);
    let polygon = new window.BMapGL.Polygon(servicePointList, {
      strokeColor: "#CE0000",
      strokeWeight: 3,
      fillColor:"#ff8605",
      fillOpacity:0.4
    });
    this.map.addOverlay(polygon);

    // 添加自行车图标
    let bikeList = res.result.bike_list;
    // let bikePointList = []
    let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg",new window.BMapGL.Size(36,42),{
      imageSize:new window.BMapGL.Size(36,42),
      anchor:new window.BMapGL.Size(36,42)
    })
    bikeList.forEach(item => {
      let p = item.split(',');
      let point = new window.BMapGL.Point(p[0],p[1]);
      let bikeMarker = new window.BMapGL.Marker(point,{icon:bikeIcon})
      this.map.addOverlay(bikeMarker);
    })
  }

  render() {
    const formList = [{
      type:'SELECT',
      label:'城市',
      field:'city',
      initialValue:'0',
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
      width:130
    },{
      type:'SELECT',
      label:'订单状态',
      field:'state',
      initialValue:'0',
      width:80,
      list:[{
        id:'0', name:'全部',
      },{
        id:'1', name:'进行中',
      },{
        id:'2', name:'行程结束',
      }]
    }]
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilterSubmit}/>
        </Card>
        <Card style={{marginTop:10}}>
          <div>共{this.state.total_count}辆</div>
          <div id="container" style={{height:500}}></div>
        </Card>
      </div>
    )
  }
}
