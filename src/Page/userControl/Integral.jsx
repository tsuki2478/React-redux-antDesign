import React from 'react'
import {
    Table,
} from 'antd'
// import AntSearchForm from "components/antForm"
import './index.less'
class Integral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* table数据 */
            tableLoading: false,
            userData: [
                {
                    time: "2018.10.21-2019.10.22",
                    where: '在哪里使用了',
                    use:'200',
                    now:'1200',
                    get:'1400',
                    name:'XXXX'
                }
            ]
        }
    }
    componentWillMount() {}
    render() {
        const userColumns = [
            {
                title:'用户昵称',
                dataIndex: 'name',
                key: 'name'               
            },{
                title: '时间',
                dataIndex: 'time',
                key: 'time'
            }, {
                title: '使用场所',
                dataIndex: 'where',
                key: 'where'
            }, {
                title: '现有积分',
                dataIndex: 'now',
                key: 'now'
            }, {
                title: '使用积分',
                dataIndex: 'use',
                key: 'use'
            }, {
                title: '获得积分',
                dataIndex: 'get',
                key: 'get'
            }
        ];
        return (
                <Table
                    className="modal-list"
                    columns={userColumns}
                    rowKey={data => data.id}
                    loading={this.state.tableLoading}
                    dataSource={this.state.userData}
                    pagination={this.state.pagination}
                    scroll={{
                    x: 600
                }} />
        )
    }
}
export default Integral