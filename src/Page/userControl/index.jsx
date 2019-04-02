import React from 'react'
import {
    Button,
    Table,
    Modal,
    Row,
    Tooltip
} from 'antd'
import AntSearchForm from "components/antForm"
// import moment from "moment"
// import _ from "lodash"
import DataList from "./DataList"
import Integral from "./Integral"
import './index.less'

class userControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 选中type类型 */
            selected: '1',
            /* table数据 */
            tableLoading: false,
            userData: [
                {
                    name: "XX",
                    type: "1321321",
                    time: "2018.10.21-2019.10.22",
                    id: '1',
                    convert:'12345566'
                }
            ],
            /* 模态框 */
            visible: false,
            confirmLoading: false,
            record: '',
            modalTitle:'',
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
        }
    }
    handleOk = (res) => {
        console.log(res)
    }
    /* 新增 */
    addHandle = (value, record) => {
        console.log(value, record)
    }
    /* 打开积分和用户模态框 */
    userList=(value,record)=> {
        console.log(value,record)
        this.setState({
            modalTitle: value, 
            visible: true,
            record:record
        })
    }
    /* 关闭modal */
    closeList=()=>{
        this.setState({
            visible:false
        })
    }
    render() {
        const itemArr = [
            {
                type: 'Input',
                key: 'serviceName',
                label: '账户',
                initialValue: '123',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'username',
                label: '账户所属',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'servicePhone',
                label: '权限',
                placeholder: '模糊查询'
            }, {
                type: 'RangePicker',
                key: 'time',
                label: '时间',
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
        const userColumns = [
            {
                title: '用户',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '用户属性',
                dataIndex: 'type',
                key: 'type'
            }, {
                title: '用户积分',
                dataIndex: 'convert',
                key: 'convert'
            }, {
                title: '上次登录时间',
                dataIndex: 'time',
                key: 'time'
            }, {
                title: '操作',
                dataIndex: 'control',
                key: 'control',
                width: 150,
                render: (value, record) => {
                    let commonStyle = {
                        border: 'none',
                        backgroundColor: 'transparent',
                    }
                    return (
                        <Row>
                            <Tooltip title="用户积分详情" >
                                <Button icon="pay-circle" type="ghost" style={commonStyle} onClick={()=> this.userList('用户积分详情',record)}></Button>
                            </Tooltip>
                            <Tooltip title="查看用户资料">
                                <Button icon="info-circle" type="ghost" style={commonStyle} onClick={()=> this.userList('查看用户资料',record)}></Button>
                            </Tooltip>             
                        </Row>
                    )
                }                
            }
        ];
        return (
            <div className="result-table">
                <div className="table-header">
                    <AntSearchForm
                        options={{
                        items: itemArr,
                        btns: btns
                    }}
                        handleCheck={this.handleOk}
                        addHandle={this.addHandle} />
                </div>
                <div className="list">
                    <Table
                        className="table-user"
                        columns={userColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.userData}
                        pagination={this.state.pagination}
                        scroll={{
                        x: 800
                    }} />
                </div>
                <Modal
                    title={this.state.modalTitle}
                    className="list-modal"
                    centered
                    keyboard={true}
                    maskClosable={false}
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    footer={false}
                    destroyOnClose={true}
                    onCancel={()=>this.closeList()}
                     >
                  {
                      this.state.modalTitle === '用户积分详情' ?
                        <Integral /> 
                      :
                      <DataList />
                  }  
                </Modal>
            </div>
        );
    }
}
export default userControl;
