import React from 'react'
import {Card, Icon, Row, Col,Modal,Select} from 'antd';
// import AntSearchForm from "components/antForm"
import './index.less'
// import moment from "moment"
import _ from "lodash"
const Option = Select.Option;

export default class banner extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    name:'word',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'1'
                }, {
                    name:'ms',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'2'
                }, {
                    name:'dnf',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'3'
                }, {
                    name:'CJ',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'4'
                }, {
                    name:'WZ',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'5'
                }, {
                    name:'lol',
                    picture: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    url: "https://ant.design/components/card-cn/",
                    number: 'No:1',
                    startTime: '2018-09-18 18:00',
                    endTime: ' 2018-09-25 18:00',
                    id:'6'                    
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
    /*添加或修改广告  */
    openModal=(value,record)=>{
        console.log(value,record)
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
        this.AntSearchForm.getValidatedArgs((args) => {
            console.log( args)
        })
    }
    /* select切换 */
    handleChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            selected:value
        })
    }
    render() {
        return (
            <Row className="result-table">
                {this.state.data && this
                    .state
                    .data
                    .map((item,index) => {
                        return (
                            <Col xl={8} key={index} style={{marginBottom:20}} sm={12} className="banner-card">
                                <Card
                                    style={{
                                    maxWidth: 300
                                }}
                                    cover={< img alt = "example" src = {item.picture} />}
                                    actions={[ < Icon type = "edit" onClick={()=>{this.openModal('更改广告',item)}} />]}>
                                    <div>
                                        <p>跳转链接:</p>
                                        <a href={item.url}>  <p>{item.url}</p></a>
                                    </div>
                                    <p>开始时间:{item.startTime}</p>
                                    <p>终止时间: {item.endTime}</p>
                                </Card>
                            </Col>
                        )
                    })
                }
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
                        <Row style={{marginBottom:20}}>
                            <Col className="ant-form-item-label ant-col-xs-24 ant-col-sm-6 ant-col-md-6 ant-col-xl-6">
                                <label className="ant-form-item-required">选择广告</label>
                             </Col>
                            <Col className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12 ant-col-xl-14">
                                <Select defaultValue="1" onChange={this.handleChange}
                                style={{width:'100%'}}
                             >
										{
											_.isArray(this.state.data)?
                                            this.state.data.map(data => <Option key={data.id} value={data.id}>{data.name}</Option>)
											:null
										}
                                </Select>
                            </Col>
                        </Row>
                </Modal>                
            </Row>

        )
    }
}