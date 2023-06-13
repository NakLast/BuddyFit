import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Image, Form, Input, Checkbox, Button } from 'antd';
import BGFitness from '../assets/BGFitness.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Perform login logic here, e.g. send the username and password to the server
        console.log('Username:', username);
        console.log('Password:', password);

        // Navigate to the situp page after successful login
        navigate('/situp');
    };

    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col xs={6} md={12} lg={12}>
                    <Image src={BGFitness} preview={false} width={'100%'} />
                </Col>
                <Col xs={6} md={12} lg={12}>
                    <Card style={{ height: '100%' }} bordered={false}>
                        <Row gutter={[100, 100]}>
                            <Col xs={24} md={24} lg={24}>
                                <Row gutter={[1, 1]}>
                                    <Col xs={24} md={24} lg={24} offset={6}>
                                        <h1>Login</h1>
                                    </Col>
                                    <Col xs={24} md={24} lg={24} offset={6}>
                                        Welcome to BuddyFit game
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Row gutter={[20, 20]} justify="center">
                                    <Form
                                        layout="vertical"
                                        autoComplete="off"
                                        style={{ width: '50%' }}
                                    >
                                        <Form.Item
                                            name="username"
                                            label="Username"
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                type="username"
                                                id="username"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                required
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button
                                                onClick={handleLogin}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#208C81',
                                                    color: 'white',
                                                    fontSize: '120%',
                                                    fontWeight: 'bold',
                                                    borderRadius: '20px',
                                                }}
                                            >
                                                Login
                                            </Button>
                                            Not registered yet? <a href="">Create an Account</a>
                                        </Form.Item>
                                    </Form>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Login;
