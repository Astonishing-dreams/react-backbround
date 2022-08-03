import React from 'react'
import { Button } from 'antd';
import { Outlet } from 'react-router-dom'

export default function App() {
    return (
        <div>
            App....
            <Button type="primary">Primary Button</Button>
            <Outlet></Outlet>
        </div>
    )
}
