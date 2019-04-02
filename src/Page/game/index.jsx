import React from 'react'
import {
    Button,
    Table,
    Modal,
    Row,
    Tooltip,
} from 'antd'
import AntSearchForm from "components/antForm"
// import moment from "moment"
// import _ from "lodash"
import './index.less'
const confirm = Modal.confirm;

class game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* table数据 */
            tableLoading: false,
            gameData: [
                {
                    name: "冒险岛",
                    provider: "盛大",
                    advert:"1200",
                    gamePeople: "1100",
                    platform:"800",
                    fromPlatform:"700",
                    status:"1",
                    id: '1',
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
    /* 查询 */
    handleOk = (res) => {
        console.log(res)
    }
    /* 新增 或 编辑 */
    addHandle = (value, record) => {
        console.log(value, record)
        this.setState({modalTitle: value, visible: true, record: record})
    }
    componentDidMount() {
        this.setState({
            tableLoading: true
        })
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
        const addArr = [
            {
                type: 'logo',
                key: 'logo',
                label: '游戏Logo',
            }, {
                type: 'Input',
                key: 'name',
                label: '游戏名称',
                initialValue: '',
                placeholder: '精确查询',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入游戏名称')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'TextArea',
                key: 'TextArea',
                label: '游戏简称',
                initialValue: '从1到100，所以这篇文章说是关于什么的呢？在互联网上有各种关于React组件模式的文章，但没有介绍如何将这些模式应用到Typescript中。此外，即将发布的TS 2.8版本带来了另人兴奋的新功能如、如有条件的类型(conditional types)、标准库中新预定义的条件类型、同态映射类型修饰符等等，这些新功能是我们能够以类型安全的方式轻松地创建常见的React组件模式。',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入游戏简称')
                    } else {
                        callback()
                    }
                }
            },{
                type: 'PUpload',
                key: 'PUpload',
                label: '活动图片',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请上传活动图片')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'InputS',
                key: 'InputS',
                label: '游戏提供商',
                initialValue: '',
                placeholder: '精确查询',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入游戏提供商')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'Input',
                key: 'id',
                label: '游戏appId',
                initialValue: '',
                placeholder: '精确查询',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入游戏appId')
                    } else {
                        callback()
                    }
                }
            },  
        ]
        const statusList = [
            {
                name: '下架',
                value: '0'
            }, {
                name: '正常',
                value: '1'
            }
        ]
        const itemArr = [
            {
                type: 'Input',
                key: 'name',
                label: '游戏名称',
                initialValue: '',
                placeholder: '精确查询'
            }, {
                type: 'Input',
                key: 'provider',
                label: '游戏提供商',
                placeholder: '精确查询'
            }, {
                type: 'Select',
                key: 'status',
                label: '状态',
                initialValue: '0',
                options: statusList
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
        const gameColumns = [
            {
                title: '游戏名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '游戏提供商',
                dataIndex: 'provider',
                key: 'provider'
            }, {
                title: '广告曝光量',
                dataIndex: 'advert',
                key: 'advert'
            }, {
                title: '游戏用户数',
                dataIndex: 'gamePeople',
                key: 'gamePeople'
            }, {
                title: '平台用户数',
                dataIndex: 'platform',
                key: 'platform'
            }, {
                title: '从平台启动游戏次数',
                dataIndex: 'fromPlatform',
                key: 'fromPlatform'
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
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
                            <Tooltip title="编辑游戏">
                                <Button
                                    icon="edit"
                                    type="filled"
                                    style={commonStyle}
                                    onClick={() => this.addHandle('编辑游戏', record)}></Button>
                            </Tooltip>
                            <Tooltip title="下架游戏">
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
                        className="table-game"
                        columns={gameColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.gameData}
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
export default game;
