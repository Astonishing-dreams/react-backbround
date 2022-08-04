import './Less/ListTable.less'
import { Space, Table, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { ArticleListApi } from '../request/api'
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
    // 列表数组
    const [dataArr, setDataArr] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
        }
    ])

    useEffect(() => {
        ArticleListApi().then(res => {
            if (res.errCode === 0) {
                console.log(res.data.arr);
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
    }, [])

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
                    <Button type='primary' onClick={() => { console.log(record.key) }}>编辑</Button>
                    <Button type='danger'>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            <Table columns={columns} dataSource={dataArr} />
        </div>
    )
}
