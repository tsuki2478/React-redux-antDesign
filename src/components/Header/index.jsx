import React from 'react'
import './index.less'
// import Util from '../../Utils/util'
// import axios from '../../axios'
import {connect} from 'react-redux'
import { Menu, Dropdown, Icon,Row, Col} from 'antd';
import { withRouter } from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    // 生命周期
    componentWillMount() {
        this.setState({userName: '境主'})
    }
    // 退出
    handleLogout=()=>{
        localStorage.removeItem('authCode')
        this.props.history.push('/login');
        console.log('成功退出')
        return
    }
    render() {
        const {menuName, menuType} = this.props;
        const dropdown = (
            <Menu style={{width:'100px'}}>
                <Menu.Item className="menuItem" style={{textAlign: 'center'}}>
                    <div onClick={this.handleLogout}>退出登录</div>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="header">
                <Row className="header-top">
                    {menuType
                        ? <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>IMooc 通用管理系统</span>
                            </Col>
                        : ''
                    }
                    <Col span={menuType
                        ? 18
                        : 24}>
                        <Dropdown overlay={dropdown} style={{top:'47px'}}>
                            <span style={{paddingRight:25,cursor: 'default'}}>
                                {this.state.userName}
                                <Icon type="down" />
                            </span>
                        </Dropdown>
                    </Col>
                </Row>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {menuName: state.menuName}
};
export default withRouter(connect(mapStateToProps)(Header))
