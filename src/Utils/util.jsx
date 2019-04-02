import React from 'react'
import { Select,Modal } from 'antd'
import { withRouter } from "react-router-dom"
const Option = Select.Option;
const AUTH_CODE_NAME = 'authCode';

/* 储存localStorage的封装 */
 function setAuthCode(code){
    localStorage.setItem(AUTH_CODE_NAME, code)
    return code;
  }
  
  function getAuthCode(){
    return localStorage.getItem(AUTH_CODE_NAME)
  }
  
  function removeAuthCode(){
    localStorage.removeItem(AUTH_CODE_NAME)
  }

export default withRouter({
     // 生成单例函数，避免多次创建同一对象
    getSingle: function(fn){
        var result;
        return function(){
            return result || (result = fn.apply(this, arguments))
        }
    },
    // 设定authCode
    setAuthCode,
    getAuthCode,
    removeAuthCode,
        // 格式化时间 2017-01-01 18:11:20
    getDateTime: function(timestamp){
        let now;
        if(timestamp){
        now = new Date(timestamp)
        }else{
        now = new Date()
        }
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        return year + '-' + (month>9?month:'0'+month) + '-' + (day>9?day:'0'+day) +' '+ (h>9?h:'0'+h) +':'+ (m>9?m:'0'+m) +':'+ (s>9?s:'0'+s);
    },
    isInteger:function (obj) {
        return obj%1 === 0
    },
      /**
   * 用于将参数转化成get参数
   * @param {any} url
   * @param {any} data
   * @returns 格式化的get参数
   */
    paramToUrl:function (url, data) {
        if(typeof(url) === 'undefined' || url == null || url == '') {
            return '';
        }
        if(typeof(data) === 'undefined' || data == null || typeof(data) !== 'object') {
            return '';
        }
        url += (url.indexOf("?") != -1) ? "" : "?";
        for(var k in data) {
            url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
            console.log(url);
        }
        return url;
    },
    // 分页封装
    pagination(data,callback){
        console.log('data',data)
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    // select便利
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = []
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
        /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
     // remove all array items
    cleanArr: function(arr){
        while(arr.length>0){
        arr.pop()
        }
    },
    // 从20171212格式化为2017年12月12日
    formateDateToCN(dateStr){
        if(dateStr && dateStr.length===8){
        return dateStr.slice(0,4)+'年'+dateStr.slice(4,6)+'月'+dateStr.slice(6)+'日'
        }else{
        return dateStr
        }
    },
    // 获取日期
    getDate(timestamp){
        let now = new Date(timestamp || null);
        let year = now.getFullYear(),
            month = now.getMonth()+1,
            day = now.getDate(),
            hour = now.getHours()

        return {
        date: `${year}-${month>9?month:('0'+month)}-${day>9?day:('0'+day)}`,
        hour
        }
    },
    // 将obj类型的参数转化为search类型
    objTransToUrl(obj){
        return Object.keys(obj)
            .map(item => `${item}=${encodeURIComponent(obj[item])}`)
            .join('&')
    },
    // 检查表单
    checkFormArgs(args, checkOption){
        let errItems = checkOption.filter(item => {
        if(item.required && (args[item] === undefined)){
            return true
        }else if(!item.reg.test(args[item])){
            return true
        }else{
            return false
        }
        })
        if(errItems.length>0){
        return errItems.map(item => item.message).join('、')+` 这 ${errItems.length} 项填写有误`
        }else{
        return false
        }
    },

    // 优化的Fetch Api
    mfetch: function(...args){
    return new Promise((resolve, reject) => {
        const url = args[0];
        const config = args[1] || {};
        config.headers = Object.assign({}, {Authorization: getAuthCode()}, config.headers)
        if(config.headers['Content-Type']==='delete')
        delete config.headers['Content-Type']
        else
        config.headers['Content-Type'] = 'application/json';
        fetch(url, config).then(data => {
        if(data.status === 200 || data.status === 304){
            return data.json()
        }else if(data.status === 401 || data.status === 400){
            removeAuthCode()
            throw new Error(`401`)
        }else{
            throw new Error(`错误码:[${data.status}]`)
        }
        }).then(json => {
        if(json.ret === 40044){
            this.props.history.push('/login');
        }else{
            resolve(json)
        }
        }).catch(err => {
        let ignoreReg = /typeerror:\s*failed\s*to\s*fetch/g
        if(ignoreReg.test(err.toString().toLowerCase())){
            return
        }

        if(/40[01]$/.test(err.toString())){
            if(window.location.pathname === '/strategy/login'){
            return
            }
            this.props.history.push('/login');
        }else{
            Modal.error({
            title: '错误',
            content: err.toString()
            })
            let cb = args.slice(-1)[0];
            if(typeof cb === 'function'){
            cb(err.toString())
            }
        }
        })
    })
    },
})