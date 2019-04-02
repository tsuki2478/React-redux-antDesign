import React from 'react'
import AntSearchForm from "components/antForm"
import moment from "moment"
import {
    Button,
    Table,
    Modal,
    Row,
    Tooltip,
    Avatar
} from 'antd'
const confirm = Modal.confirm;

export default class bannerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /* table数据 */
            tableLoading: false,
            bannerData: [
                {
                    name: 'lol',
                    pic: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847983436,2355118798&' +
                        'fm=200&gp=0.jpg',
                    url: 'baidu.com',
                    time: "2018.10.21-2019.10.22"
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
    /* 刚进入页面 */
    componentDidMount() {
        const today = {};
        let _today = moment();
        today.date = _today.format('YYYY-MM-DD HH:mm');/*现在的时间*/
        today.tomorrow = _today
            .add('days', '1')
            .format('YYYY-MM-DD HH:mm');/*前一天的时间*/
        this.state.today = today.date;
        this.state.tomorrow = today.tomorrow;
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
        this
            .AntSearchForm
            .getValidatedArgs((args) => {
                console.log(args)
            })
    }
    /* 下架游戏 */
    close = (record) => {
        confirm({
            title: `您确定删除${record.name}吗?`,
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
    render() {
        const dateFormat = 'YYYY-MM-DD HH:mm';
        const bannerColumns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '奖品图像',
                dataIndex: 'pic',
                key: 'pic',
                render: (value, record) => {
                    return (<Avatar size={70} src={value} shape="square" />)
                }
            }, {
                title: '广告跳转地址',
                dataIndex: 'url',
                key: 'url'
            }, {
                title: '展示时间',
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
                            <Tooltip title="编辑广告">
                                <Button
                                    icon="edit"
                                    type="filled"
                                    style={commonStyle}
                                    onClick={() => this.addHandle('编辑广告', record)}></Button>
                            </Tooltip>
                            <Tooltip title="删除广告">
                                <Button
                                    icon="delete"
                                    type="filled"
                                    style={commonStyle}
                                    onClick={() => this.close(record)}></Button>
                            </Tooltip>
                        </Row>
                    )
                }
            }
        ];
        const btns = [
            {
                type: 'check'
            }, {
                type: '新增'
            }, {
                type: 'clear'
            }
        ];
        const itemArr = [
            {
                type: 'Input',
                label: '广告名称',
                dataIndex: 'banner',
                key: 'banner'
            }, {
                type: 'RangePicker',
                label: '创建时间',
                dataIndex: 'time',
                key: 'time'
            }
        ];
        const addArr = [
            {
                type: 'Input',
                label: '广告名称',
                dataIndex: 'banner',
                key: 'banner'
            }, {
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
                type: 'Input',
                key: 'Input',
                label: '跳转地址',
                initialValue: '',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入游戏提供商')
                    } else {
                        callback()
                    }
                }
            }, {
                type: 'RangePickerMin',
                key: 'time',
                label: '展示时间',
                initialValue: [
                    moment(this.state.today, dateFormat),
                    moment(this.state.tomorrow, dateFormat)
                ],
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请选择始止时间')
                    } else {
                        callback()
                    }
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
                        className="table-banner"
                        columns={bannerColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.bannerData}
                        pagination={this.state.pagination}
                        scroll={{
                        x: 500
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
                    this.handleCancel();
                    this.AntSearchForm && this
                        .AntSearchForm
                        .handleClear()
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
                        wrappedComponentRef={(inst) => this.AntSearchForm = inst} />
                </Modal>
            </div>
        )
    }
}