import React from 'react'
import { Form, Input, Button,Checkbox, Icon } from 'antd';
import './login.less';
import {withRouter} from "react-router-dom";
// import Util from '@/util';
// const mfetch = Util.mfetch;
// import Cookie from 'react-cookie';
const FormItem = Form.Item;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // 登陆成功，localStorage储存，并且跳转
    loginSuccess=(json)=>{
        localStorage.setItem('authCode', 'Bearer '+json.access_token);
        this.props.history.push('/home');
      }
  
    // 提交表单
    handleSubmit=(e)=> {
        e.preventDefault();
        this.setState({
            submitting: true
        })
        this.props.form.validateFields((err, values) => {
            if(err){
                console.log(err)
                this.setState({
                    submitting: false
                })
                return
            }
            console.log('获取输入:',values)
            this.loginSuccess('111')
            // let url = `/oauth/token`;
            // url += `?grant_type=password&client_id=client&client_secret=123456&username=${values.userName}&password=${values.passWord}`
            // mfetch(url, {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'x-www-form-urlencoded'
            //     }
            // })
            // .then(data => {
            // if(/^400$/.test(data.status)){
            //     Modal.error({
            //     title: '错误',
            //     content: '登录失败，账号或密码错误。'
            //     })
            //     this.setState({
            //     submitting: false
            //     })
            // }else if(/^401$/.test(data.status)){
            //     Modal.error({
            //     title: '错误',
            //     content: '登录失败，账号或密码错误。'
            //     })
            //     this.setState({
            //     submitting: false
            //     })
            //     return data.json()
            // }else{
            //     return data.json()
            // }
            // })
            // .then(json => {
            //     if(json.access_token){
            //         this.loginSuccess(json)
            //     }else{
            //     Modal.error({
            //         title: '登录失败',
            //         content:'用户名不存在'
            //     })
            //     this.setState({
            //         submitting: false
            //     })
            //     }
            // })
        });
    }
  
    render() {
     const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>商户后台管理系统</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" 
                            className="login-form-button"
                            disabled={this.state.submitting}
                            style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
Login = Form.create()(Login);
export default withRouter(Login);

