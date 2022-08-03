import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';

const { Sider, Content } = Layout;

export default function App() {
    return (
        <Layout id='app'>
            <Header></Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </Content>
            </Layout>
            <footer>Footer</footer>
        </Layout>
    )
}
