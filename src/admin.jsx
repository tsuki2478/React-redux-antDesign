import React from 'react'
import {Layout, Row, Col} from 'antd'
import Nav from './components/Nav'
import './style/common.less'
import Header from './components/Header'
import Footer from './components/Fooder'
import MenuConfig from './Config/menuConfig'
const {Content, Sider} = Layout;

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}
    render() {
        return (

            <Layout className="container">
                {/* 左侧 */}
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    className="NavLeft"
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}>
                    <Nav MenuConfig={MenuConfig} />
                </Sider>

                <Layout className="main">
                    {/* 头部 */}
                    <Header></Header>
                    {/*主体
    如果将Content改成div的话,当内容不足时，底部会上来.content组件限制了最小高度
     */}
                    <Content className="content">
                        {/* 嵌套子组件 */}
                        {this.props.children}
                    </Content>
                    {/* 底部 */}
                    <Footer ></Footer>
                </Layout>
            </Layout>
        )
    }
}
