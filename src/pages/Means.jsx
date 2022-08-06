import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Less/Means.less'
import { GetUserDataApi, ChangeUserApi } from '../request/api'
import { Button, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

// 将图片改为base64的格式
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

// 上传前的回调
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 / 1024 < 200;

    if (!isLt2M) {
        message.error('请上传小于200kb的图片!');
    }

    return isJpgOrPng && isLt2M;
};

function Means(props) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    // const [username1, setUsername] = useState('')
    // const [password1, setPassword] = useState('')

    useEffect(() => {
        GetUserDataApi().then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                // 由于是异步的这样修改不会生效
                // setUsername(res.data.username)
                // setPassword(res.data.password)
                sessionStorage.setItem('username', res.data.username)
            }
        })
    }, [])

    // 表单提交的事件
    const onFinish = (values) => {
        if (values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== '') {
            ChangeUserApi({
                password: values.password
            }).then(res => {
                if (res.errCode === 0) {
                    message.success(res.message)
                    setTimeout(() => {
                        navigate('/login')
                        localStorage.clear()
                    }, 1000);
                } else message.error(res.message)
            })
        }
    }

    // 上传的函数
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                // 存储图片名称
                // console.log(localStorage.getItem('avatar'));
                localStorage.setItem('avatar', info.file.response.data.filePath)
                // console.log(localStorage.getItem('avatar'));
                // 触发Header组件更新
                // window.location.reload() // 强制页面刷新（不是很理想）
                // console.log(props);
                props.addKey() // 失败品
                // console.log(props.myKey);
            });
        }
    };

    // 上传失败的显示
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                点击上传
            </div>
        </div>
    );

    return (
        <div className='means'>
            <Form
                name="basic"
                style={{ width: '400px' }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="修改用户名：" name="username">
                    <Input placeholder='请输入新用户名' />
                </Form.Item>

                <Form.Item label="修 改 密 码：" name="password" >
                    <Input.Password placeholder='请输入新密码' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16, }} >
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
            <p>点击下方修改头像：</p>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={{ 'cms-token': localStorage.getItem('cms-token') }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                    />
                ) : (uploadButton)}
            </Upload>
        </div>
    )
}

// 失败品
const mapDispatchToProps = (dispatch) => {
    return {
        addKey() {
            const action = { type: 'addKeyFn' }
            dispatch(action)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        myKey: state.myKey
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Means)
