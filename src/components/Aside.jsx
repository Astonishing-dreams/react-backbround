import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('查看文章列表List', 'list1', <ReadOutlined />),
    getItem('查看文章列表Table', 'list2', <ReadOutlined />),
    getItem('文章编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <DatabaseOutlined />),
];


export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState()
    const onClick = (e) => {
        navigate('/' + e.key)
        setDefaultKey(e.key)
    };

    useEffect(() => {
        let path = location.pathname
        setDefaultKey(path.split('/')[1])
    }, [location.pathname])

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 200,
            }}
            selectedKeys={[defaultKey]}
            mode="inline"
            items={items}
            className='aside'
            theme='dark'
        />
    )
}
