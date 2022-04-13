import React, { Component } from 'react'
import { Table } from 'antd';

export default class index extends Component {

  onRowClick = (record,index) => {
    // 判断是单选还是复选
    let { rowSelection, selectedRowKeys, selectedItem, selectedIds } = this.props;
    if(rowSelection === 'checkbox') {
      if(selectedIds){
        const i = selectedIds.indexOf(record.id);
        if(i===-1){
          selectedIds.push(record.id);
          console.log(selectedIds)
          selectedRowKeys.push(index);
          console.log(selectedRowKeys)
          selectedItem.push(record);
          console.log(selectedItem)
        }else{
          selectedIds.splice(i,1);
          selectedRowKeys.splice(i,1);
          selectedItem.splice(i,1);
        }
      }else{
        selectedIds=[record.id];
        selectedRowKeys=[index];
        selectedItem=[record];
      }
      this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
    }else{
      let selectKey = [index];
      this.props.updateSelectedItem(selectKey,record)
    }
  }

  tableInit = () => { 
    let row_selection = this.props.rowSelection;
    let { selectedRowKeys } = this.props;
    const rowSelection = {
      type:"radio",
      selectedRowKeys
    }
    if(row_selection === false || row_selection===null) {
      row_selection = false;
    }else if(row_selection === "checkbox"){
      rowSelection.type = "checkbox";
    }else{
      row_selection = 'radio'
    }

    return <Table
      bordered
      {...this.props}
      rowSelection={row_selection?rowSelection:null}
      onRow={(record, index) => {
        return {
          onClick: () => {
            if(!row_selection) return;
            this.onRowClick(record, index)
          }
        };
      }}
    />
  }

  render() {
    return (
      <div>
        {this.tableInit()}
      </div>
    )
  }
}
