import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [loginError, setLoginError] = useState({
        messageError: false,
        validateStatus: false,
    });
    useEffect(() => {
        if (loginError.messageError) {
            message.error('Неверный логин или пароль!');
            setLoginError((prev) => {
                return { ...prev, messageError: false };
            });
        }
    }, [loginError]);

    const onFinish = ({ username, password }) => {
        axios
            .post('./api/login.php', { username: username, password: password })
            .then((res) => {
                setAuth(res.data.auth);
                setLoginError({
                    messageError: true,
                    validateStatus: true,
                });
            });
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="login_title">Авторизация</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        validateStatus={
                            loginError.validateStatus ? 'error' : 'success'
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите имя!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={
                            loginError.validateStatus ? 'error' : 'success'
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите пароль!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
