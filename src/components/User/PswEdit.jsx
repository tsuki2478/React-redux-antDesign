import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'antd'
import Util from 'components/Util/Util';
import SearchingForm from 'components/Common/SearchingForm';
const {mfetch, checkFormArgs} = Util;

export class PswEdit extends Component {
  static propTypes = {

  }

  handleOk = () => {
    this.SearchingForm.getValidatedArgs((args) => {
      if(args.password !== args.password2){
        Modal.error({
          title: '密码错误',
          content: '两次输入的密码不一致，请重新输入。'
        })
        return false
      }

      const userId = this.props.userData.id;
      let url = `/api/v2/oauth/user/${userId}/resetPwd`;
      mfetch(url, {
        method: 'PUT',
        body: JSON.stringify({password: args.password})
      }).then(json => {
        if(json.ret === 0){
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

  render() {
    const itemArr = [
      {
        type: 'Input',
        key: 'password',
        valueType: 'password',
        label: '登录密码',
        initialValue: '',
        placeholder: '请输入登录密码',
        validator: (rule, value, callback) => {
          if(!value){
            callback('登录密码为必填')
          }else{
            callback()
          }
        }
      },
      {
        type: 'Input',
        key: 'password2',
        valueType: 'password',
        label: '确认密码',
        initialValue: '',
        placeholder: '请再次输入登录密码',
        validator: (rule, value, callback) => {
          if(!value){
            callback('确认登录密码为必填')
          }else{  
            callback()
          }
        }
      }
    ]

    return (
      <div>
        <Modal
          title="修改密码"
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
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

export default PswEdit
