import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import { Modal } from 'antd'
import { withRouter } from "react-router-dom"

axios.interceptors.request.use(
    config => {
        NProgress.start()
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    NProgress.done()
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: response.statusText
        }
    }
}

function checkCode(res) {
    if (res.data.code === -500) {
        this.props.history.push('/login');
    } else if (res.data.code === -400) {
        this.props.history.push('/home');
    } else if (res.data.code !== 200) {
        Modal.error({
            title: '错误',
            content: res.data.message.toString()
        })
    }
    return res
}

export default withRouter({
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 6000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 6000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(checkStatus)
            .then(checkCode)
    }
})

// 测试语法
//    async handleInsert() {
//         const {
//             data: { message, code, data }
//         } = await api.post('backend/category/insert', this.state)
//         if (code === 200) {
//             setMessage({ type: 'success', content: message })
//             this.props.dispatch({ type: 'insertCategoryItem', item: data })
//             this.props.history.push('/backend/category/list')
//         }
//     }