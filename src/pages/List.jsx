import { List, Skeleton, Pagination, Button, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ArticleListApi, ArticleDelApi } from '../request/api'
import { useNavigate } from 'react-router-dom'

export default function List1() {
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [update, setUpdate] = useState(10);

    const getArticleList = (num) => {
        ArticleListApi({
            num,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                let { arr, total, num, count } = res.data
                // console.log(arr, total, num, count);
                setList(arr)
                setTotal(total)
                setCurrent(num)
                setPageSize(count)
            }
        })
    }

    useEffect(() => {
        getArticleList(current)
    }, [update])

    const onChange = (pages) => {
        getArticleList(pages)
    }

    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            if (res.errCode === 0) message.success(res.message)
            // 删除完成重新请求或者刷新页面
            setUpdate(update + 1)
        })
    }

    return (
        <div className='list_table' style={{ padding: '20px' }}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type='primary' onClick={() => { navigate('/edit/' + item.id) }}>修改</Button>,
                            <Button type='danger' onClick={() => delFn(item.id)}>删除</Button>
                        ]}
                    >
                        <Skeleton loading={false} active>
                            <List.Item.Meta
                                title={<a href="#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div>{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination
                style={{ float: 'right', marginTop: '10px' }}
                onChange={onChange}
                total={total}
                pageSize={pageSize}
                current={current}
            />
        </div>
    )
}
