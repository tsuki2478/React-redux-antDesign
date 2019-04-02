import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action/menu'

import './index.less';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup; Menu方法可以看一下官方，简单的使用，完全封装了..
// MenuItemGroup里面是菜单树，类似一个对象json数组.
// 一般是刚进入页面时，从服务器控制中心获取到的动态路由。现在先写死，获取的格式是一样的--
class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuTree: '',
            currentKey: ''
        }
    }
     isNull = []
    // 菜单点击
    handleClick = ({ item, key }) => {
        if (key === this.state.currentKey) {
            return false;
        } //  相同则，turn 
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title)); // 这里是通过redux，获取用户点击的跳转的title。。
        this.setState({
            currentKey: key
        });
    };
    // 生命周期
    componentDidMount() {
        // 赋值给menuTree
        if (this.state.menuTree === '' || !this.state.menuTree) {
            const menuTree = this.renderMenu(this.props.MenuConfig||this.isNull);
            this.setState({ menuTree })
        };
    }
    /**
     *先循环出第一次, 如果 存在children，则return自己 item.children。再一次执行renderMenu方法
     *SubMenu和Menu是antd官方提供的..
     *NavLink是跳转方式, 
     *可以去Config/menuConfig.js文件里看一下Json就知道其逻辑..
     * key是匹配menuConfig定义的路由，一般会动态获取配置中心，目前没有这东西，就自己写一个！
     * @memberof Nav
     */
    renderMenu = (res) => {
        return res.map(item => {
            if (item.children) {
                //  递归形式
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }

            return <Menu.Item title={item.title} key={item.key}>
                {/* 菜单跳转的路由 */}
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }

    homeHandleClick = () => {
        const { dispatch } = this.props;
        dispatch(switchMenu('首页'));
        this.setState({
            currentKey: ""
        });
    };
    render() {
        return (
            <div className="nav-left">
                <NavLink to="/home" onClick={this.homeHandleClick}>
                <div className="logo">
                    <img src="https://upload-images.jianshu.io/upload_images/3913372-a5e80e15229efd06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" />
                </div>
                </NavLink>
                <Menu 
                    onClick={this.handleClick}
                    theme="dark"
                    mode="inline"
                >
                    {this.state.menuTree}
                </Menu>
            </div>
        )
    }
}
export default connect()(Nav)
