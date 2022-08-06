import App from "../App";
import List from '../pages/List'
import ListTable from '../pages/ListTable'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// 这里一定要用()不能使用箭头的函数使用{} ——不然没有显示
const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/list1" element={<List />}></Route>
                <Route path="/list2" element={<ListTable />}></Route>
                <Route path="/edit" element={<Edit />}></Route>
                <Route path="/edit/:id" element={<Edit />}></Route>
                <Route path="/means" element={<Means />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </Router>
)
export default BaseRouter
