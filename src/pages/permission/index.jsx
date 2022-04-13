import React, { Component } from 'react'
import { Button, Card, Modal, Form, Input, Select, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable';
import axios from '../../axios';
import Utils from './../../utils/utils';
import menuConfig from './../../config/menuConfig';

const { Option } = Select;
const { TreeNode } = Tree;
export default class index extends Component {

  state = {
    dataSource: [],
    isRoleVisible: false,
    isPermVisible: false
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/role/list', {}, true)
  }

  handleCreateRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.getFieldsValue();
    axios.ajax({
      url: "/role/create",
      data: {
        params: data
      }
    }).then(res => {
      if (res.code === '0') {
        this.setState({
          isRoleVisible: false,
          selectedRowKeys: []
        })
        this.requestList()
      }
    })
  }

  // 权限控制
  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  renderTreeNodes = menuConfig => {
    return menuConfig.map(item => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key} />
      }
    })
  }

  onCheck = checkedKeys => {
    // console.log(checkedKeys)
    this.setState({
      menuInfo: checkedKeys
    })
  }

  handlePermSubmit = () => {
    let data = this.permForm.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url: "/permission/edit",
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res.code === '0') {
        this.setState({
          isPermVisible: false,
          selectedRowKeys: []
        })
        this.requestList()
      }
    })
  }

  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      })
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id);
  }

  getRoleUserList = id => {
    axios.ajax({
      url: "/role/user_list",
      data: {
        params: {
          id
        }
      }
    }).then(res => {
      if (res.code === '0') {
        this.getAuthUserList(res.result)
      }
    })
  }
  // 筛选目标用户
  getAuthUserList = dataSource => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      dataSource.forEach(item => {
        const data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status
        }
        if (data.status === 1) {
          targetKeys.push(data.key)
        }
        mockData.push(data);
      })
      this.setState({
        mockData,
        targetKeys
      })
    }
  }

  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'role/user_role_edit',
      data:{
        params:{
          ...data
        }
      }
    }).then(res => {
      if(res){
        this.setState({
          isUserVisible:false,
          selectedRowKeys:[]
        })
        this.requestList();
      }
    })
  }


  render() {
    const { dataSource, selectedRowKeys } = this.state
    const columns = [{
      title: "角色ID",
      dataIndex: "id"
    }, {
      title: "角色名称",
      dataIndex: "role_name"
    }, {
      title: "创建时间",
      dataIndex: "create_time",
      render(create_time) {
        return Utils.formateDate(new Date(create_time))
      }
    }, {
      title: "使用状态",
      dataIndex: "status",
      render(status) {
        return status === 1 ? "启用" : "停用"
      }
    }, {
      title: "授权时间",
      dataIndex: 'authorize_time',
      render(authorize_time) {
        return Utils.formateDate(new Date(authorize_time))
      }
    }, {
      title: "授权人",
      dataIndex: 'authorize_user_name'
    }]

    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }

    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleCreateRole}>创建角色</Button>
          <Button type="primary" style={{ margin: '0 10px' }} onClick={this.handlePermission}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <ETable
          updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          columns={columns}
          dataSource={dataSource}
          selectedRowKeys={selectedRowKeys}
        />
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.resetFields();
            this.setState({
              isRoleVisible: false,
              selectedRowKeys: []
            })
          }}
        >
          <Form {...formItemLayout} ref={c => this.roleForm = c}>
            <Form.Item label="角色名称" name="role_name">
              <Input placeholder="请输入角色名称" />
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Select>
                <Option value={0}>关闭</Option>
                <Option value={1}>开启</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          onOk={this.handlePermSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <Form {...formItemLayout} ref={c => this.permForm = c}>
            <Form.Item label="角色名称" name="role_name">
              <Input disabled placeholder={this.state.detailInfo ? this.state.detailInfo.role_name : ""} />
            </Form.Item>
            <Form.Item label="状态" name="status" initialValue={0}>
              <Select>
                <Option value={0}>启用</Option>
                <Option value={1}>停用</Option>
              </Select>
            </Form.Item>
            <Tree
              checkable  //是否有勾选框
              defaultExpandAll //默认展开
              onCheck={checkedKeys => {  //点击复选框触发
                this.onCheck(checkedKeys)
              }}
              checkedKeys={this.state.menuInfo}//（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
            >
              <TreeNode title="平台权限" key="platform_all">
                {this.renderTreeNodes(menuConfig)}
              </TreeNode>
            </Tree>
          </Form>
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.userForm.resetFields();
            this.setState({
              isUserVisible: false,
              selectedRowKeys: []
            })
          }}
        >
          <Form {...formItemLayout} ref={c => this.userForm = c}>
            <Form.Item label="角色名称" name="role_name">
              <Input disabled placeholder={this.state.detailInfo ? this.state.detailInfo.role_name : ""} />
            </Form.Item>
            <Form.Item label="选择用户">
              <Transfer
                listStyle={{width:200,height:400}}
                dataSource={this.state.mockData}
                titles={["待选用户", "已选用户"]}
                showSearch
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div >
    )
  }
}
