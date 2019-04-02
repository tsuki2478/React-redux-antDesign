import React from 'react'
import {Card,  Avatar, Col, Row} from 'antd';
const {Meta} = Card;

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
        console.log('1111111111')
    }
    render() {
        return (
            <div>
                <Card style={{width: 300}} bordered={false}>
                    <Meta
                        avatar={< Avatar src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="XX" />
                    <p>性别：男</p>
                    <p>电话号码:15800001111</p>
                </Card>
                <Row gutter={16}>
                    <Col md={8} sm={24} xs={24}>
                        <Card>
                            <p>收件人：XX</p>
                            <p>电话号码:15800001111</p>
                            <p>地址：深圳市南山区科新路10086号</p>
                        </Card>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                        <Card>
                            <p>收件人：XX</p>
                            <p>电话号码:15800001111</p>
                            <p>地址:深圳市南山区科新路10086号</p>
                        </Card>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                        <Card>
                            <p>收件人：XX</p>
                            <p>电话号码:15800001111</p>
                            <p>地址：深圳市南山区科新路10086号</p>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}
export default DataList