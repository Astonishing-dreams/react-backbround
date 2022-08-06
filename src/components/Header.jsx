import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/images/logo.png'
import imgAvatar from '../assets/images/imgAvatar.jpg'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';


export default function Header() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(imgAvatar)
    const [username, setUsername] = useState('游客')

    useEffect(() => {
        let usernameNew = localStorage.getItem('username')
        let avatarNew = localStorage.getItem('avatar')
        if (usernameNew) setUsername(usernameNew)
        if (avatarNew) setAvatar('http://47.93.114.103:6688/' + avatarNew)
        console.log(localStorage.getItem('avatar'));
    }, [localStorage.getItem('avatar')])

    const menuThings = ({ key }) => {
        if (key === '2') {
            message.success('退出成功，即将返回登录页')
            localStorage.clear()
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        } else if (key === '1') {
            setTimeout(() => {
                navigate('/means')
            }, 1000);
        }
    }

    const menu = (
        <Menu
            onClick={menuThings}
            items={[
                {
                    key: '1',
                    label: '修改资料',
                },
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    label: '退出登录',
                }
            ]}
        />
    );

    return (
        <header>
            <img src={logoImg} alt="" className="logo" />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <img src={avatar} alt="" className='avatar' />
                            <span>{username}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
