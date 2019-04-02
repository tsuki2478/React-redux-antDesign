import React from 'react'
import Loadable from 'react-loadable'
import {Spin} from 'antd'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

// 模板
import App from './App'
import Admin from './admin.jsx';
// 登录
import Login from './Page/login'
const loading = (props) => {
    if (props.error) {
        return <div>出现错误!</div>;
    } else if (props.timedOut) {
        return <div>网页无反应，请刷新页面...</div>;
    } else if (props.pastDelay) {
        return (
            <div className="spin">
                <Spin size="large" />
            </div>
        )
    } else {
        return null
    }
}

const RouterList = [
    {
        /* 首页 */
        component: () => import ('./Page/Home'),
        path: '/home'
    }, {
        /* 公共基础 -权限 */
        component: () => import ('./Page/manager/permission'),
        path: '/manager/permission'
    }, {
        /* 公共基础 -用户 */
        component: () => import ('./Page/manager/User'),
        path: '/manager/user'
    }, {
        /* 公共基础 -菜单 */
        component: () => import ('./Page/manager/menu'),
        path: '/manager/menu'
    }, {
        /* 活动管理 */
        component: () => import ('./Page/activity'),
        path: '/activity/list'
    }, {
        /* 活动管理 */
        component: () => import ('./Page/activity/details'),
        path: '/activity/details'
    }, {
        /* 用户列表 */
        component: () => import ('./Page/userControl'),
        path: '/user/list'
    }, {
        /* 游戏列表 */
        component: () => import ('./Page/game'),
        path: '/game/list'
    }, {
        /* 奖品列表 */
        component: () => import ('./Page/prize'),
        path: '/game/prize'
    }, {
        /* 广告 */
        component: () => import ('./Page/banner'),
        path: '/banner/view'
    }, {
        /* 广告列表 */
        component: () => import ('./Page/bannerList'),
        path: '/banner/list'
    }
]

const IRouter = () => {
    return (
        <BrowserRouter >
            <App>
                <Switch>
                    {/* 登录路由 */}
                    <Route path="/login" component={Login} /> {/* 内容理由，分类很多 */}
                    <Route
                        path="/"
                        render={() => <Admin>
                        <Switch>
                            {RouterList.map(item => (<Route
                                key={item.path}
                                exact={true}
                                path={item.path}
                                component={Loadable({loader: item.component, loading, delay: 300, timeout: 10000})} />))}
                            <Redirect to="/home" />
                        </Switch>
                    </Admin>} />
                </Switch>
            </App>
        </BrowserRouter>
    )
}
export default IRouter