import React from 'react'
import {Card,Button,Row,Col,Table,Tooltip,Icon} from 'antd'
import './index.less'
export default class details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: false,
            data:''
        }
    }
    render() {
        const detailsColumns = [
            {
                title: '用户昵称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '用户属性',
                dataIndex: 'type',
                key: 'type'
            }, {
                title: '投入积分',
                dataIndex: 'into',
                key: 'into'
            }, {
                title: '中间概率',
                dataIndex: 'chance',
                key: 'chance'
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
                            <Tooltip title="可能性" >
                                <Button icon="edit" type="ghost" style={commonStyle}></Button>
                            </Tooltip>
                        </Row>
                    )
                }
            }
        ]
        console.log('this.props', this.props)
        return (
            <Row className="result-table" gutter={16}>
                <Col xs={24} xl={8}>
                    <Row className="details-Row" >
                    <Col className="details-Card" xs={24} sm={12} xl={24}>
                            <Card
                                hoverable
                                title="Card title" 
                                style={{ maxWidth: 300 }}
                                cover={<img alt="example" src="http://img.hb.aicdn.com/4bbaf851e9b3a956af496026c4a5686675ecbd3831672-NrbYhB_fw658" />}
                                >
                            </Card>     
                    </Col>
                            <Col xl={24}>本次参与人数: <span>240</span></Col>
                            <Col xl={24}>已投积分: <span>100</span></Col>
                            <Col xl={24}>开奖所需积分:<span>120 </span></Col>
                            <Col xl={24}>距离下次开奖: <span>00.04.29</span></Col>
                            <Col xl={24}>已开奖次数:  <span>13次</span></Col>
                            <Col xl={24}> <Icon type="eye" theme="twoTone" twoToneColor="#52c41a" />查看历史参与名单 </Col>
                    </Row>         
                </Col>
                <Col xs={24} xl={16}>
                    <Table
                        columns={detailsColumns}
                        rowKey={data => data.id}
                        loading={this.state.tableLoading}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        scroll={{
                        x: 400
                    }} />
                </Col>
            </Row>
        );
    }
}