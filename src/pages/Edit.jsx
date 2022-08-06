import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import moment from 'moment';
import E from 'wangeditor'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'

let editor = null

export default function Edit() {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const dealData = (res) => {
        // 关闭对话框
        setIsModalVisible(false);
        if (res.errCode === 0) {
            message.success(res.message)
            navigate('/list1')
        } else {
            message.error(res.message)
        }
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                // console.log(values);
                // form.resetFields();  // reset重置
                let { title, subTitle } = values
                // 地址栏有id代表更新
                if (params.id) {
                    ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(res => dealData(res))
                } else {
                    ArticleAddApi({ title, subTitle, content }).then(res => dealData(res))
                }
            })
            .catch(() => { return; });
    };

    useEffect(() => {
        editor = new E('#div1')
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        editor.create()

        if (params.id) {
            ArticleSearchApi({ id: params.id }).then(res => {
                if (res.errCode === 0) {
                    let { title, subTitle, content } = res.data
                    editor.txt.html(content)
                    setTitle(title)
                    setSubTitle(subTitle)
                }
            })
        }

        return () => {
            // 结束时需要销毁
            editor.destroy()
        }
    }, [location.pathname])

    return (
        <div>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={params.id ? () => window.history.back() : null}
                    title="文章标题"
                    subTitle={"当前日期：" + moment(new Date).format('YYYY-MM-DD')}
                    extra={
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => setIsModalVisible(true)}
                        >提交文章</Button>
                    }
                ></PageHeader>
            </div>
            <div id="div1" style={{ padding: '0 20px', background: '#fff' }}></div>
            <Modal
                zIndex={99999}
                title="请填写文章标题"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okText='确定'
                cancelText='取消'
            >
                <Form
                    initialValues={{ title, subTitle }}
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 21,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请填写标题!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="副标题"
                        name="subTitle"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
