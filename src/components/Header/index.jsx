/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Utils from './../../utils/utils';
import axios from './../../axios';
import './index.less';

class Header extends Component {

  state = {
    userName: "辛佳欢",
    sysTime: ''
  }

  componentWillMount() {
    setInterval(() => {
      let sysTime = Utils.formateDate(new Date());
      this.setState({
        sysTime
      })
    }, 1000)
    this.getWeatherAPIData();
  }

  getWeatherAPIData() {
    let city = "北京"
    axios.jsonp({
      url: `https://www.tianqiapi.com/api?version=v1&appid=21375891&appsecret=fTYv7v5E&city=${encodeURIComponent(city)}`
    }).then(res => {
      if (res) {
        let city = res.city;
        let wea = res.data[0].wea;
        this.setState({
          city,
          wea
        })
      }
    })
  }

  render() {
    const { menuType } = this.props
    return (
      <div className="header ">
        <Row className="header-top">
        {
            menuType ? (
              <Col span={6} className='logo'>
                <img src="/assets/logo-ant.svg" alt="" />
                <span>IMooc通用管理系统</span>
              </Col>
            ):''
          }
          <Col span={menuType?18:24} >
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        {
          menuType ? "" : <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              {this.props.menuName}
            </Col>
            <Col span={20} className="breadcrumb-right">
              <span className="time">{this.state.sysTime}</span>
              <span className="weather">{this.state.city} {this.state.wea}</span>
            </Col>
          </Row>
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    menuName:state.menuName
  }
}

export default connect(mapStateToProps)(Header)
