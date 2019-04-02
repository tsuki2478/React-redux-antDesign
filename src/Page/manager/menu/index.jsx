import React from 'react'
// import {Card, Button, notification} from 'antd'
import AntSearchForm from "components/antForm"
import menuConfig from '../../../Config/menuConfig'

export default class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            record: '',
            menuConfig: [],
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
            },
            wrapper: {
                xs: { span: 24 },
                xl: { span: 6 },
                sm: { span: 6 },
            } 
        };
    };
    handleOk = (res) => {
        console.log(res)
        console.log(res.type.slice(-1))

    }
    /* 新增 */
    addHandle = (value, record) => {
        console.log(value, record)
        this.state.modalTitle = value;
        this.setState({visible: true})
    }


    render() {
        const fieldNames = {
            label: 'title',
            value: 'key'
        };
        const itemArr = [
            {
                type: "Cascader",
                key: 'type',
                label: '请选择目录',
                options: menuConfig,
                fieldNames:fieldNames,
                placeholder: '空为最上级'
            }, {
                type: 'Input',
                key: 'menuName',
                label: '菜单名称',
                placeholder: '请输入'
            }, {
                type: 'Input',
                key: 'username',
                label: '菜单路由',
                placeholder: '例如:/manager/menu'
            }, {
                type: 'Input',
                key: 'icon',
                label: '图标',
                disabled: true,
                placeholder: '待扩展'
            }
        ]
        const btns = [
            {
                type: 'check',
                name: '提交'
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
                    colSpan={this.state.colSpan}
                    wrapper={this.state.wrapper}
                    span={this.state.span}
                    handleCheck={this.handleOk}
                    addHandle={this.addHandle} />
            </div>
        );
    }
}