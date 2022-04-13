import { Modal } from 'antd';
import axios from 'axios';
import JsonP from 'jsonp';
import Utils from './../utils/utils';

export default class Axios {

  static requestList(_this, url, params, isMock) {
    var data = {
      params,
      isMock
    }
    this.ajax({
      url,
      data,
    }).then(res => {
      if (res.code === '0') {
        let dataSource = res.result.item_list.map((item, index) => {
          item.key = index;
          return item
        })
        _this.setState({
          dataSource,
          // selectedRowKeys:[],
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            _this.requestList()
          })
        })
      }
    })
  }

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: "callback"
      }, (err, response) => {
        if (response) {
          resolve(response)
        } else {
          reject(err.message)
        }
      })
    })
  }
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    let baseApi = ''
    if (options.data.isMock) {
      baseApi = "https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi";
    } else {
      baseApi = "https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi";
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code === '0') {
            resolve(res)
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}