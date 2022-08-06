import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';

export default function App(props) {
    return (
        <Layout id='app'>
            <Header />
            <div className='container'>
                <Aside />
                <div className='container_box'>
                    <Bread />
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Respect | Copyright © 2022 Author {localStorage.getItem('username')}</footer>
        </Layout>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         myKey: state.myKey
//     }
// }

// export default connect(mapStateToProps)(App)
