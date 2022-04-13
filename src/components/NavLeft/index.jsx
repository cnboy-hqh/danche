import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/action';
import MenuList from '../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;
class NavLeft extends Component {

  state = {
    menuTreeNode: [],
    currentKey: ''
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuList);
    let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  handleClick = ({item,key}) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey:key
    })
  }

  renderMenu = data => {
    // eslint-disable-next-line array-callback-return
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg " alt="" />
          <h1>Imooc Ms</h1>
        </div>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
export default connect()(NavLeft)