import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Less/Login.less'
import logoImg from '../assets/images/logo.png'
import { LoginApi } from '../request/api'

export default function Login() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        // console.log(values);
        LoginApi({
            username: values.username,
            password: values.password
        }).then(res => {
            // console.log(res);
            if (res.errCode === 0) {
                localStorage.setItem('avatar', res.data.avatar)
                localStorage.setItem('cms-token', res.data['cms-token'])
                localStorage.setItem('editable', res.data.editable)
                localStorage.setItem('player', res.data.player)
                localStorage.setItem('username', res.data.username)
                setTimeout(() => {
                    message.success('登录成功!')
                    navigate('/list1')
                }, 1000);
            } else {
                message.error(res.message)
            }
        })
    };

    return (
        <div className="login">
            <div className='login_box'>
                <img src={logoImg} alt="" />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} size='large' placeholder='请输入用户名' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} size='large' placeholder='请输入密码' />
                    </Form.Item>

                    <Form.Item>
                        <Link to='/register'>还没账号？立即注册</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" block htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
