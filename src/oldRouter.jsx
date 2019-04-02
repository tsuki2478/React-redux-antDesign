import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './Page/login'
import Admin from './admin.jsx';
import OrderDetail from './Page/order/detail'
import Common from './common'

/* 首页 */
import Home from './Page/Home';
/* 公共基础 */
import Permission from './Page/manager/permission'
import managerUser from './Page/manager/User'
import menu from './Page/manager/menu'

/* 活动管理 */
import activity from './Page/activity'
import details from './Page/activity/details'

/* 用户管理 */
import userControl from './Page/userControl'
/* 游戏管理 */
import game from './Page/game'
/* 奖品列表 */
import prize from './Page/prize'
/* 广告 */
import banner from './Page/banner'
import bannerList from './Page/bannerList'


const IRouter = () => {
    return (
        <BrowserRouter >
            <App>
                <Switch>
                    {/* 登录路由 */}
                    <Route path="/login" component={Login} /> {/* 内容理由，分类很多 */}
                    {/*  地图*/}
                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    }
                    />
                    <Route
                        path="/"
                        render={() => <Admin>
                        <Switch>
                            <Route path="/home" component={Home} />
                            {/* 公共基础 */}
                            <Route path="/manager/permission" component={Permission} />
                            <Route path="/manager/user" component={managerUser} />
                            <Route path="/manager/menu" component={menu} />
                            {/* 活动管理 */}
                            <Route path="/activity/list" component={activity} />
                            <Route path="/activity/details" component={details} />
                            {/* 用户列表 */}
                            <Route path="/user/list" component={userControl} />

                            {/* 游戏列表 */}
                            <Route path="/game/list" component={game} />
                            {/* 奖品列表 */}
                            <Route path="/game/prize" component={prize} />
                            {/* 广告 */}
                            <Route path="/banner/view" component={banner} />
                            <Route path="/banner/list" component={bannerList} />
                            <Redirect to="/home" />
                        </Switch>
                    </Admin>} /> 
                </Switch>
            </App>
        </BrowserRouter>
    )
}

export default IRouter
