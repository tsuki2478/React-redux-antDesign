import React from 'react';
import {Modal} from 'antd';
import EditForm from './EditForm';
import Util from 'components/Util/Util';
const {mfetch} = Util;

class RoleEdit extends React.Component {

  onShow(data){
    console.log(data);
  }

  handleOk = () => {
    this.formRef.handleGetArgs((res) => {
      const isAudit = !!this.props.roleData.id;
      let params = {
        name: res.name,
        status: res.status?'0':'1',
        type: res.type,
        permissions: res.checkedKeys.filter(item => item.match(/-/g) && item.match(/-/g).length==2).map(x => {
          let arr = x.split('-');
          return {
            menu: arr[0],
            subMenu: arr[1],
            name: arr[2]
          }
        })
      };
      if(isAudit) params.id=this.props.roleData.id;
      let url = `/api/v2/oauth/role`;
      mfetch(url, {
        method: isAudit?'PUT':'POST',
        body: JSON.stringify(params)
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

  render(){
    let defaultCheckedKeys = [];
    if(this.props.roleData.permissions){
      defaultCheckedKeys = this.props.roleData.permissions.map(x => [x.menu, x.subMenu, x.name].join('-'))
    }

    return (
      <div>
        <Modal
          title='角色管理'
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          onOk={this.handleOk}
        >
          {
            this.props.visible?
            <EditForm
              wrappedComponentRef={(inst) => this.formRef = inst}
              roleData={this.props.roleData}
              defaultCheckedKeys={defaultCheckedKeys}
            />:null
          }
        </Modal>
      </div>
    )
  }
}

RoleEdit.defaultProps = {
  visible: false,
  roleData: {}
}

export default RoleEdit;
