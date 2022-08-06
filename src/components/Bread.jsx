import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState()

    useEffect(() => {
        switch (pathname) {
            case '/list1':
                setBreadName('查看文章列表List')
                break;
            case '/list2':
                setBreadName('查看文章列表Table')
                break;
            case '/edit':
                setBreadName('文章编辑')
                break;
            case '/means':
                setBreadName('修改资料')
                break;

            default:
                setBreadName(pathname.includes('edit') ? '文章编辑' : '')
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{ height: '30px', lineHeight: '30px' }}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
