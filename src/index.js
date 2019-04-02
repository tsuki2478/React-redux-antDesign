    import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Router from './Router'
import registerServiceWorker from './registerServiceWorker';
import fastClick from 'fastclick'
/* 热加载 */
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware()))

fastClick.attach(document.body)

const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </LocaleProvider>
        </AppContainer>,
        document.getElementById('root')
    )
}
render(Router)

if (module.hot) {
    module.hot.accept('./Router', () => { // 当我们热更新的代码出现的时候，把App重新加载
        const NextApp = require('./Router').default //因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上
        render(NextApp) // 重新渲染到 document 里面
    })
}

registerServiceWorker();
