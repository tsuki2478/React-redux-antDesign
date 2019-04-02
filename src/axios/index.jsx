import JsonP from 'jsonp';
import axios from 'axios'
import { Modal } from 'antd'    
import Utils from '../Utils/util'

export default class Axios {
  
    // Jsonp
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                parmam:'callback'
            },function(err,response) {
                // debugger;
                if(response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    };

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                timeout:4000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    let res = response.data;
                    if (res.code == '0'){
                    console.log('response.data',response.data)
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }

}