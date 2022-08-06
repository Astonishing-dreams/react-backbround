import './Less/ListTable.less'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ArticleListApi, ArticleDelApi } from '../request/api'
import { Space, Table, Button, message } from 'antd';
import moment from 'moment';

function MyTitle(props) {
    return (
        <div>
            <a className='table_title' href={`http://codesohigh.com:8765/article/` + props.id} target='_blank'>
                {props.title}
            </a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}

export default function ListTable() {
    const navigate = useNavigate()
    // 列表数组
    const [dataArr, setDataArr] = useState([
        {
            key: '1',
            myTitle: '芜湖',
            date: '22-08-05 12:17:28',
        }
    ])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    // 提取请求的代码
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize,
        }).then(res => {
            if (res.errCode === 0) {
                // console.log(res.data);
                const { num, total, count } = res.data
                setPagination({
                    current: num,
                    pageSize: count,
                    total
                })
                let newArr = JSON.parse(JSON.stringify(res.data.arr)),
                    myArr = []
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format('YY-MM-DD hh:mm:ss'),
                        myTitle: <MyTitle title={item.title} subTitle={item.subTitle} id={item.id} />
                    }
                    myArr.push(obj)
                })
                setDataArr(myArr)
            }
        })
    }

    // 请求文章列表
    useEffect(() => {
        getArticleList(pagination.current, pagination.pageSize)
    }, [])

    // 分页的函数
    const pageChange = (arg) => {
        // console.log(arg);
        const { current, pageSize } = arg
        getArticleList(current, pageSize)
    }

    // 删除的函数
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            if (res.errCode === 0) message.success(res.message)
            // 删除完成重新请求或者刷新页面
            getArticleList(1, 10)
        })
    }

    const columns = [
        {
            dataIndex: 'myTitle',
            key: 'myTitle',
            width: '60%',
            render: (text) => <div>{text}</div>
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: (text) => <p>{text}</p>,
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => { navigate('/edit/' + record.key) }}>编辑</Button>
                    <Button type='danger' onClick={() => delFn(record.key)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={dataArr}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    )
}
