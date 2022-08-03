import App from "../App";
import List from '../pages/List'
import Edit from '../pages/Edit'
import Login from '../pages/Login'
import Means from '../pages/Means'
import Register from '../pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const BaseRouter = () => {
    <BrowserRouter>
        <Routes>
            <Route path="" element={<App />}></Route>
        </Routes>
    </BrowserRouter>
}
