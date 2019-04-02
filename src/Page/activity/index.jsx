import React from 'react'
import {
    Button,
    Table,
    Modal,
    Row,
    Col,
    Select, 
    Form,
    Input,
    Radio,
    Tooltip,
    Popconfirm
} from 'antd'
import AntSearchForm from "components/antForm"
import {withRouter,Link} from "react-router-dom"
import moment from "moment"
import _ from "lodash"
import './index.less'

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class PrizeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          Loading: false,
          Prize:'',
          type:'',
          integral:'',
          rule:2
        }
      }
      /* 每次选中奖品 */
      onChangePrize=(value)=>{
          console.log(value)
          this.setState({
            Prize:value,
            type:value,
            integral:value,
          })
      }
      /* 每次选中开奖规则 */
      radioOnChange=(value)=>{
        console.log(value)
        this.setState({
            rule:value
        })          
      }
      /* 清空 */
      handleClear=()=>{
		this.props.form.resetFields()
      }
	/* 模态框返回 */
	getValidatedArgs = (callback) => {
        this.props.form.validateFields((errors, values) => {
            if (errors)
            return;
			callback(values)
        })
	}
      componentWillMount(){
          console.log('进来时，先获取奖品')
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        const { selected } = this.props;
        console.log(this.props,'this.props')
        const values = this.props.form.getFieldsValue()
        console.log('value',values)
        const formItemLayout = {
			labelCol: this.props.span || {
			  xs: { span: 24 },
			  sm: { span: 12 },
			  xl:{ span: 10}
			},
			wrapperCol: {
			  xs: { span: 24 },
			  xl: { span: 12 },
			  sm: { span: 12 },
			},
		  };
		const colSpan = this.props.colSpan || {
			xs: { span: 24 },
			sm: { span: 12 },
			xl: { span: 6 },
          }
          const TypeList = [
            {
                name: '请选择',
                value: '0'
            }, {
                name: '商户',
                value: '1'
            }, {
                name: '渠道',
                value: '2'
            }, {
                name: '测试',
                value: '3'
            }
        ];
        return (
            <Form layout="horizontal" className = "modal">
             <Col {...colSpan} key="prize">
              <FormItem {...formItemLayout} label="奖品选择:" required>
                {getFieldDecorator('prize', {initialValue:'0',
                rules: [
                {
                required: true,
                validator: (rule, value, callback) => {
                if (value === '0') {
                callback("请选择预警订阅项！");
                }
                callback();
                }
                }]})(
                <Select
                    onChange={this.onChangePrize}
                    placeholder="请选择奖品"
                    key="Select" >
                    {
                    _.isArray(TypeList)?
                     TypeList.map(leaf => <Option key={leaf.value} value={leaf.value}>{leaf.name}</Option>)
                    :null
                    }
                </Select>
                )}
              </FormItem>
             </Col>
             <Col {...colSpan} key="type">
              <FormItem {...formItemLayout} label="奖品属性">
                {getFieldDecorator('type', {
                    initialValue: this.state.type
                })(
                    <Input disabled={true} />
                )}
              </FormItem>   
             </Col>
             <Col {...colSpan} key="integral">
              <FormItem {...formItemLayout} label={selected === '1'?'开奖积分线' :'直接兑换积分线'}>
                {getFieldDecorator('integral', {
                    initialValue: this.state.integral,
                    rules: [
                      {required: true, message: '开奖积分线为空'},
                      {pattern:/^\d+(?:\.\d{1,2})?$/, message: '请输入正确的积分格式,最多保留两位小数点;' }
                    ]
                })(
                    <Input type="number" />
                )}
              </FormItem>   
              </Col>
              {
                selected === '1'?
                <div>
                    <Col {...colSpan} key="rule">
                        <FormItem {...formItemLayout} label="开奖规则">
                        {getFieldDecorator('rule', {
                            initialValue: this.state.rule,
                            rules: [
                                {required: true, message: '请选择'},
                            ]
                        })(
                            <RadioGroup name="radiogroup" onChange={this.radioOnChange}>
                            <Radio value={1}>达到开奖积分线</Radio>
                            <Radio value={2}>时间间隔奖</Radio>
                            </RadioGroup>
                        )}
                        </FormItem>   
                    </Col>
                    { this.state.rule === 2 || values.rule === 2 ?
                    <Col {...colSpan} key="interval">
                        <FormItem {...formItemLayout} label="间隔分钟开奖一次">
                            {getFieldDecorator("interval", {
                                initialValue: 20,
                                rules: [
                                    {required: true, message: '请输入时间间隔'},
                                    {pattern:/^[0-9]*$/, message: '请输入正确的积分格式,最多保留两位小数点;' }
                                ]
                            })(
                                    <Input type="number" style={{width:150}}></Input>
                            )}
                        </FormItem>   
                    </Col>
                    :null
                    }
                </div>
                :
                <Col {...colSpan} key="convert">
                <FormItem {...formItemLayout} label="可兑换分线">
                  {getFieldDecorator('convert', {
                      initialValue: '0.1',
                      rules: [
                        {required: true, message: '可兑换分线为空'},
                        {pattern:/^\d+(?:\.\d{1,2})?$/, message: '请输入正确的积分格式,最多保留两位小数点;' }
                      ]
                  })(
                      <Input type="number" />
                  )}
                </FormItem>   
                </Col>                
              }
            </Form>
        )
      }
}
let Prize = Form.create()(PrizeForm);
class activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 选中type类型 */
            selected:'1',
            /* table数据 */
            tableLoading: false,
            data: [{
                ownerType:"1",
                agentId:"2",
                agentName:"xx11111111111111111",
                merchantId:"1321321",
                time:"2018.10.21-2019.10.22",
                ipPool:"2.31",
                id:'1'
            }],
            /* 模态框 */
            visible: false,
            confirmLoading: false,
            record: '',
            /* 名单模态框 */
            listVisible:false,
            listLoading: false,
            listId:'',
            list: [{
                ownerType:"1",
                agentId:"2",
                agentName:"xx11111111111111111",
                merchantId:"1321321",
                time:"2018.10.21-2019.10.22",
                ipPool:"2.31",
                convert:'1111',
                id:'1'
            }],
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
            time:[]
        }
    }
    /* 创建 */
    onCreate = (value,record) => {
        console.log(value,record)
        this.setState({
            modalTitle: value, 
            visible: true,
            record:record
        })
    }
    /* 取消创建或编辑模态框 */
    handleCancel = () => {
        this.setState({visible: false})
    }
    /* 确定创建或编辑模态框 */
    OnOk = () => {
        this.AntSearchForm.getValidatedArgs((args) => {
            console.log('奖品之前', args)
            this.Prize.getValidatedArgs((args) => {
            console.log('奖品', args)
            })
        })
    }
    /* select切换 */
    handleChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            selected:value
        })
    }
    /* 图片上传成功，先返回图片信息 */
    UploadSuccess(pic) {
        console.log('pic',pic)
    }
    /* 刚进入页面 */
    componentDidMount() {
		const today = {};
		let _today = moment();
		today.date = _today.format('YYYY-MM-DD HH:mm'); /*现在的时间*/
        today.tomorrow = _today.add('days','1').format('YYYY-MM-DD HH:mm'); /*前一天的时间*/
        this.state.today = today.date;
        this.state.tomorrow = today.tomorrow;
    }
    /* 是否确定删除 */
    confirmOn=(value,record)=>{
        console.log(value,record)
    }
    /* 取消删除 */
    confirmCancel(value){
        console.log(value,'拒绝删除')
    }
    /* 打开名单 */
    OpenList=(list)=>{
        console.log(list,'打开名单')
        this.setState({
            listVisible:true,
            listId:list.agentId
        })
    }
    /* 关闭名单模态框 */
    closeList=()=>{
        this.setState({
            listVisible:false
        })
        this.state.listId = '';
    }

    render() {
        const dateFormat = 'YYYY-MM-DD HH:mm';
        const listColumns = [
            {
                title: '开奖时间',
                dataIndex: 'time',
                key: 'time'
            }, {
                title: '奖品原因',
                dataIndex: 'agentName',
                key: 'agentName'
            }, {
                title: '开奖积分',
                dataIndex: 'convert',
                key: 'convert'
            }, {
                title: '获奖用户',
                dataIndex: 'merchantId',
                key: 'merchantId'
            }, {
                title: '奖品状态',
                dataIndex: 'ownerType',
                key: 'ownerType'
            }, {
                title: '盈利率',
                dataIndex: 'ipPool',
                key: 'ipPool'
            },
        ]
        const activityColumns = [
            {
                title: '活动名称',
                dataIndex: 'ownerType',
                key: 'ownerType'
            }, {
                title: '奖品',
                dataIndex: 'agentId',
                key: 'agentId'
            }, {
                title: '奖品属性',
                dataIndex: 'agentName',
                key: 'agentName'
            }, {
                title: '参与人数',
                dataIndex: 'merchantId',
                key: 'merchantId'
            }, {
                title: '起止时间',
                dataIndex: 'time',
                key: 'time'
            }, {
                title: '盈利率',
                dataIndex: 'ipPool',
                key: 'ipPool'
            }, {
                title: '获奖名单',
                dataIndex: 'creator',
                key: 'creator',
                render: (value, record) => {
                    let commonStyle = {
                        border: 'none',
                        backgroundColor: 'transparent',
                    }
                    return (
                      <Tooltip title="名单">
                            <Button type="ghost" icon="copy" style={commonStyle} onClick={()=> this.OpenList(record)}>
                            </Button>
                      </Tooltip>
                    )
                }                
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
                            <Tooltip title="编辑" >
                                <Button icon="edit"type="ghost" style={commonStyle} onClick={()=> this.onCreate('修改活动',record)}></Button>
                            </Tooltip>
                            <Tooltip title="详情">
                                <Link to={{
                                    pathname: '/activity/details',
                                    record: record
                                    }}>
                                <Button icon="info-circle" type="ghost" style={commonStyle}></Button>
                                </Link>
                            </Tooltip>             
                            <Popconfirm title="你是否确认删除这项内容?" onConfirm={()=>{this.confirmOn('0',record)}} onCancel={()=>{this.confirmCancel('0')}} okText="是" cancelText="否">
                                <Tooltip title="删除">
                                 <Button icon="delete" type="ghost" style={commonStyle}></Button>
                                </Tooltip>             
                            </Popconfirm>        
                                            
                        </Row>
                    )
                }
            }
        ]
        const addArr = [
            {
                type: 'Input',
                key: 'Name',
                label: '活动名称',
                initialValue: 'XX活动',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入活动名称')
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
                type: 'TextArea',
                key: 'TextArea',
                label: '活动规则',
                initialValue: '从1到100，所以这篇文章说是关于什么的呢？在互联网上有各种关于React组件模式的文章，但没有介绍如何将这些模式应用到Typescript中。此外，即将发布的TS 2.8版本带来了另人兴奋的新功能如、如有条件的类型(conditional types)、标准库中新预定义的条件类型、同态映射类型修饰符等等，这些新功能是我们能够以类型安全的方式轻松地创建常见的React组件模式。',
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请输入活动规则')
                    } else {
                        callback()
                    }
                }
            },{
                type:'RangePickerMin',
                key:'time',
                label:'始止时间',
                initialValue :[moment(this.state.today, dateFormat),moment(this.state.tomorrow, dateFormat)],
                validator: (rule, value, callback) => {
                    if (!value) {
                        callback('请选择始止时间')
                    } else {
                        callback()
                    }
                }                
            },
        ]
        return (
            <div className="result-table">
                <div className="activity-header">
                    <Button type="primary" style={{width: '120px'}} onClick={()=> this.onCreate('创建活动')}>创建活动</Button>
                </div>
                <div className="activity-list">
                    <Table
                        className="table-activity"
                        columns={activityColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.data}
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
                    this.Prize && this.Prize.handleClear();
                    this.AntSearchForm && this.AntSearchForm.handleClear()
                }}
                    cancelText={'取消'}
                    okText={'保存'}
                    centered
                    destroyOnClose={true}
                      >
                    <div>
                        <Row style={{marginBottom:20}}>
                            <Col className="ant-form-item-label ant-col-xs-24 ant-col-sm-6 ant-col-md-6 ant-col-xl-6">
                                <label className="ant-form-item-required">活动类型</label>
                             </Col>
                            <Col className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12 ant-col-xl-12">
                                <Select defaultValue="1" onChange={this.handleChange}
                                style={{width:'100%'}}
                             >
                                    <Option value="1">积分抽奖</Option>
                                    <Option value="2">积分兑换奖品</Option>
                                </Select>
                            </Col>
                        </Row>
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
                        <Prize 
                            wrappedComponentRef={(inst) => this.Prize = inst}
                            colSpan={this.state.colSpan}
                            span={this.state.span}
                            selected={this.state.selected}
                            record= {this.state.record}
                        />                               
                    </div>
                </Modal>
                <Modal
                    title={'名单'}
                    className="list-modal"
                    cancelText={'取消'}
                    okText={'保存'}
                    centered
                    keyboard={true}
                    maskClosable={false}
                    visible={this.state.listVisible}
                    confirmLoading={this.state.listLoading}
                    footer={false}
                    destroyOnClose={true}
                    onCancel={()=>this.closeList()}
                     >
                <div className="activity-list">
                    <Table
                        className="table-activity"
                        columns={listColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        scroll={{
                        x: 600
                    }} />
                </div>
                </Modal>
            </div>

        );
    }
}
export default withRouter(activity);
