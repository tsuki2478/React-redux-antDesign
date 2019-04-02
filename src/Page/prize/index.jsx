import React from 'react'
import {
    Button,
    Table,
    Modal,
    Row,
    Tooltip,
    Avatar 
} from 'antd'
import AntSearchForm from "components/antForm"
// import moment from "moment"
// import _ from "lodash"
import './index.less'
const confirm = Modal.confirm;

class prize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* table数据 */
            tableLoading: false,
            prizeData: [
                {
                    name: "ippone XS MAX",
                    type: "1",
                    time: "2018.10.21-2019.10.22",
                    id: '1',
                    remaining: '14',
                    money:'10000',
                    textarea:'谢谢著作权侵权',
                    pic:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847983436,2355118798&fm=200&gp=0.jpg'
                }
            ],
            /* 模态框 */
            visible: false,
            confirmLoading: false,
            record: '',
            modalTitle: '',
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
        this.setState({modalTitle: value, visible: true, record: record})
    }
   /* 下架游戏 */
   closeGame = (record) => {
    confirm({
        title: `您确定下架${record.name}吗?`,
        content: '请再三考虑',
        okText: '确定',
        okType: 'danger',
        cancelText: '不是',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        }
    });
    }
    /* 图片上传成功，先返回图片信息 */
    UploadSuccess(pic) {
        console.log('pic', pic)
    }
    /* 取消创建或编辑模态框 */
    handleCancel = () => {
        this.setState({visible: false})
    }
    /* 确定创建或编辑模态框 */
    OnOk = () => {
        this.AntSearchForm.getValidatedArgs((args) => {
            console.log( args)
        })
    }
    render() {
        const statusList = [
            {
                name: '实物',
                value: '0'
            }, {
                name: '虚拟',
                value: '1'
            }
        ]
        const addArr = [
                 {
                type: 'Input',
                key: 'name',
                label: '奖品名称',
                initialValue: '',
                placeholder: '请输入奖品名称',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入奖品名称')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'Select',
                key: 'status',
                label: '奖品类型',
                initialValue: '0',
                options: statusList
            }, {
                type: 'Input',
                key: 'money',
                label: '奖品价格',
                placeholder: '请输入奖品价格'
            },{
                type:'InputNumber',
                key: 'remaining',
                label: '存库',
                placeholder: '请输入存库数量'
            }, {
                type: 'TextArea',
                key: 'TextArea',
                label: '奖品描述',
                initialValue: '从1到100，所以这篇文章说是关于什么的呢？在互联网上有各种关于React组件模式的文章，但没有介绍如何将这些模式应用到Typescript中。此外，即将发布的TS 2.8版本带来了另人兴奋的新功能如、如有条件的类型(conditional types)、标准库中新预定义的条件类型、同态映射类型修饰符等等，这些新功能是我们能够以类型安全的方式轻松地创建常见的React组件模式。',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入奖品描述')
                    } else {
                        callback()
                    }
                }
            },{
                type: 'PUpload',
                key: 'PUpload',
                label: '奖品图片',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请上传奖品图片')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'RangePicker',
                key: 'time',
                label: '时间'
            }  
        ]

        const itemArr = [
            {
                type: 'Input',
                key: 'serviceName',
                label: '奖品名称',
                initialValue: '',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'money',
                label: '奖品价格',
                placeholder: '精确查询'
            }, {
                type: 'Select',
                key: 'status',
                label: '奖品类型',
                initialValue: '0',
                options: statusList
            },{
                type: 'RangePicker',
                key: 'time',
                label: '时间'
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
        const prizeColumns = [
            {
                title: '奖品名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '奖品图像',
                dataIndex: 'pic',
                key: 'pic',
                render: (value, record) => {
                    return (
                        <Avatar size={70} src={value} shape="square" />
                    )
                }
            }, {
                title: '奖品类型',
                dataIndex: 'type',
                key: 'type'
            }, {
                title: '奖品价格',
                dataIndex: 'money',
                key: 'money'
            }, {
                title: '奖品描述',
                dataIndex: 'textarea',
                key: 'textarea'
            }, {
                title: '库存',
                dataIndex: 'remaining',
                key: 'remaining'
            }, {
                title: '创建时间',
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
                        backgroundColor: 'transparent'
                    }
                    return (
                        <Row>
                            <Tooltip title="编辑奖品">
                                <Button
                                    icon="edit"
                                    type="filled"
                                    style={commonStyle}
                                    onClick={() => this.addHandle('编辑奖品', record)}></Button>
                            </Tooltip>
                            <Tooltip title="删除该奖品">
                                <Button
                                    icon="delete"
                                    type="filled"
                                    style={commonStyle}
                                    onClick={() => this.closeGame(record)}></Button>
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
                        className="table-prize"
                        columns={prizeColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.prizeData}
                        pagination={this.state.pagination}
                        scroll={{
                        x: 800
                    }} />
                </div>
                {/* 增加和编辑的模态框 */}
                <Modal
                    title={this.state.modalTitle}
                    closable={false}
                    className="activity-modal"
                    keyboard={true}
                    maskClosable={false}
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.OnOk}
                    onCancel={() => {
                    this.handleCancel()
                    this.AntSearchForm && this.AntSearchForm.handleClear()
                }}
                    cancelText={'取消'}
                    okText={'保存'}
                    centered
                    destroyOnClose={true}>
                    <AntSearchForm
                        options={{
                        items: addArr,
                        btns: []
                    }}
                        UploadSuccess={this.UploadSuccess}
                        colSpan={this.state.colSpan}
                        span={this.state.span}
                        wrappedComponentRef={(inst) => this.AntSearchForm = inst}
                        formClassName="fromActivity" />
                </Modal>
            </div>
        );
    }
}
export default prize;
