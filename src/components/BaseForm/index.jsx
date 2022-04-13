import React, { Component } from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd';
import Utils from './../../utils/utils';

export default class index extends Component {

  handleFilterSubmit = () => {
    let fieldsValue = this.myForm.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  }

  reset = () => {
    this.myForm.resetFields();
  }

  initFormList = () => {
    let formItemList = [];
    let formList = this.props.formList;
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let { label, field, placeholder, initialValue, width, type, list } = item;
        if (type === "时间查询") {
          const begin_time = <Form.Item label="订单时间" name="start_time" >
            <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择开始时间' style={{ width: width }}/>
          </Form.Item>
          formItemList.push(begin_time);
          const end_time = <Form.Item label="~" name="end_time" colon={false} >
            <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间'style={{ width: width }} />
          </Form.Item>
          formItemList.push(end_time);
        } else if (type === 'INPUT') {
          const INPUT = <Form.Item label={label} name={field} key={field} initialValue={initialValue}>
            <Input type="text" placeholder={placeholder} style={{ width: width }} />
          </Form.Item>
          formItemList.push(INPUT);
        } else if (type === 'SELECT') {
          const SELECT = <Form.Item label={label} name={field} key={field} initialValue={initialValue}>
            <Select placeholder={placeholder} style={{ width: width }}>
              {Utils.getOptionList(list)}
            </Select>
          </Form.Item>
          formItemList.push(SELECT);
        } else if (type === 'CHECKBOX') {
          const CHECKBOX = <Form.Item label={label} name={field} valuePropName="checked"
            initialValue={initialValue}>
            <Checkbox>
              {label}
            </Checkbox>
          </Form.Item>
          formItemList.push(CHECKBOX);
        } else if (type === "DATE") {
          const DATE = <Form.Item label={label} key={field} >
            <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间' style={{ width: width }}/>
          </Form.Item>
          formItemList.push(DATE);
        }
      })
    }
    return formItemList;
  }

  render() {
    return (
      <Form layout="inline" ref={c => this.myForm = c}>
        {this.initFormList()}
        <Form.Item>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
