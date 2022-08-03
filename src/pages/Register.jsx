import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Less/Login.less'
import logoImg from '../assets/images/logo.png'
import { RegisterApi } from '../request/api'

export default function Register() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        RegisterApi({
            username: values.username,
            password: values.password
        }).then(res => {
            if (res.errCode === 0) {
                // 跳回登录页
                setTimeout(() => {
                    message.success('注册成功！')
                    navigate('/login')
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

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} size='large' placeholder='请再次确认密码' />
                    </Form.Item>

                    <Form.Item>
                        <Link to='/login'>已有账号？前往登录</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" block htmlType="submit">
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
