import React from 'react';
import { Row, Col } from 'antd';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const LoginPage = (props) => {
  const { path } = props;

  return (
    <Row style={{ padding: '100px 0' }}>
      <Col span={20} offset={2}>
        {path === 'login' ? <LoginForm /> : <RegisterForm />}
      </Col>
    </Row>
  );
};

export default LoginPage;
