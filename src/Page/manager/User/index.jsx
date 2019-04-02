import React from 'react'
// import {Card, Button, notification} from 'antd'
import AntSearchForm from "components/antForm"
export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 模态框 */
            visible: false,
            confirmLoading: false,
            record: '',
            colSpan: {
                span: 24
            },
            span: {
                xs: {
                    span: 24
                },
                md: {
                    span: 6
                },
                xl: {
                    span: 6
                },
                sm: {
                    span: 6
                }
            }
        };
    }
    handleOk = (res) => {
        console.log(res)
    }
    /* 新增 */
    addHandle = (value, record) => {
        console.log(value, record)
        this.state.modalTitle = value;
        this.setState({visible: true})
    }

    render() {
        const roleStatusList = [
            {
                name: '全部',
                value: '-1'
            }, {
                name: '启用',
                value: '0'
            }, {
                name: '停用',
                value: '1'
            }
        ]

        const roleList = this.roleList || [
            {value:'1',name:'管理人员'},
            {value:'2',name:'客服专员'},
            {value:'3',name:'系统管理员'},
            {value:'4',name:'市场专员'}
        ]
        const itemArr = [
            {
                type: 'Input',
                key: 'serviceName',
                label: '员工姓名',
                initialValue: '123',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'username',
                label: '用户名称',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'servicePhone',
                label: '手机号码',
                placeholder: '模糊查询'
            }, {
                type: 'Select',
                key: 'type',
                label: '角色',
                options: roleList,
                placeholder: '请选择角色'
            }
        ]
        const btns = [
            {
                type: 'check'
            }, {
                type: '新增'
            }, {
                type: 'clear'
            }
        ]
        return (
            <div className="result-table">
                <AntSearchForm
                    options={{
                    items: itemArr,
                    btns: btns
                }}
                    handleCheck={this.handleOk}
                    addHandle={this.addHandle} />
            </div>
        );
    }
}