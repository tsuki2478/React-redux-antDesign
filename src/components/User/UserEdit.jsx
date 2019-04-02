import React from 'react';
import {Modal} from 'antd';
import Util from 'components/Util/Util';
import SearchingForm from 'components/Common/SearchingForm';
const {mfetch, checkFormArgs} = Util;

class UserEdit extends React.Component {

  handleOk = () => {
    
    this.SearchingForm.getValidatedArgs((args) => {
      const isAudit = !!this.props.userData.id;
      let params = {
        ...args
      };

      // 判断当前选中的角色是否已经停用
      if(this.props.roleList.some(item => item.value==params.role && item.status==1)){
        Modal.error({
          title: '失败',
          content: '您所选择的角色已被停用，请重新选择。'
        })
        return false
      }

      params.roles = [{id: params.role}]
      delete params.role;
      if(isAudit) params.id=this.props.userData.id;
      let url = `/api/v2/oauth/user`;
      mfetch(url, {
        method: isAudit?'PUT':'POST',
        body: JSON.stringify(params)
      }).then(json => {
        if(json.ret === 0){
          this.SearchingForm.handleClear()
          this.props.handleOk()
        }else{
          Modal.error({
            title: '错误',
            content: `错误码：${json.ret} 提示：${json.msg}`
          })
        }
      })
    })

  }

  render(){
    const roleList = this.props.roleList;
    const initUserData = this.props.userData;

    console.log(initUserData, 'initUserData');

    const statusList = [
      {name: '启用', value: '0'},
      {name: '停用', value: '1'}
    ]

    const itemArr = [
      {
        type: 'QueryAgent',
        key: 'agentId',
        nameKey: 'agentName',
        initialValue: initUserData.agentId,
        initialNameValue: initUserData.agentName,
        label: '所属渠道',
        placeholder: '选择渠道',
        validator: (rule, value, callback) => {
          if(!value){
            callback('所属渠道为必选')
          }else{
            callback()
          }
        }
      },{
        type: 'Input',
        key: 'username',
        label: '用户名称',
        initialValue: initUserData.username,
        placeholder: '请输入用户名称',
        validator: (rule, value, callback) => {
          const reg = /^[\w]{4,16}$/
          if(!value){
            callback('用户名称为必填')
          }else if(!reg.test(value)){
            callback('用户名称必须为4-16位的字母或数字组成')
          }else{
            callback()
          }
        }
      },{
        type: 'Input',
        key: 'serviceName',
        label: '员工姓名',
        initialValue: initUserData.serviceName,
        placeholder: '请输入员工姓名',
        validator: (rule, value, callback) => {
          const reg = /^[\u4E00-\u9FA5A-Za-z0-9\s]+$/
          if(!value){
            callback('员工姓名为必填')
          }else if(!reg.test(value)){
            callback('员工姓名不得含有标点符号')
          }else{
            callback()
          }
        }
      },{
        type: 'Input',
        key: 'servicePhone',
        label: '手机号码',
        initialValue: initUserData.servicePhone,
        placeholder: '请输入手机号码',
        validator: (rule, value, callback) => {
          const reg = /^1\d{10}$/
          if(!value){
            callback('手机号码为必填')
          }else if(!reg.test(value)){
            callback('手机号码格式有误')
          }else{
            callback()
          }
        }
      },{
        type: 'Select',
        key: 'role',
        label: '选择角色',
        initialValue: initUserData.roles && initUserData.roles[0] && initUserData.roles[0].id || '',
        placeholder: '请选择角色',
        options: roleList,
        validator: (rule, value, callback) => {
          if(!value){
            callback('用户角色为必选')
          }else{
            callback()
          }
        }
      },{
        type: 'Select',
        key: 'status',
        label: '启用',
        initialValue: String(initUserData.status || '0'),
        options: statusList
      }
    ]
    return (
      <div>
        <Modal
          title="用户管理"
          visible={this.props.visible}
          onCancel={() => {
            this.SearchingForm.handleClear()
            this.props.handleCancel()
          }}
          onOk={this.handleOk}
        >
          <div>
            <SearchingForm
              options={{
                items: itemArr,
                btns: []
              }}
              colSpan={12}
              wrappedComponentRef={(inst) => this.SearchingForm = inst}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

UserEdit.defaultProps = {
  visible: false,
  userData: {},
  roleList: []
}

export default UserEdit;
