import React from 'react';
import { Row, Col, Form, Input, notification } from 'antd';
import { Link } from '@reach/router';
import { useDispatch } from 'react-redux';

import { actionCreator } from 'store/user/user.meta';
import styles from '../../style.module.css';

const { Password } = Input;

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    return dispatch(actionCreator.login({ ...values }));
  };

  const handleSsoClick = () => {
    notification.error({
      message: 'SSO Connection Failed',
      description:
        'Could not connect to the Keycloak server. Please try again later.',
    });
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row>
        <Col span={24}>
          <Row>
            <span className={styles.specialHeadingLogin}>Login</span>
          </Row>
        </Col>

        <Col span={24}>
          <Row style={{ marginTop: 24 }} gutter={[0, 16]}>
            <Col span={24}>
              <span className={styles.loginLabel}>
                EMAIL ADDRESS &nbsp;
                <span
                  className={`${styles.loginLabel} ${styles.loginRequired}`}
                >
                  *
                </span>
              </span>
            </Col>

            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'Email is invalid.',
                  },
                  {
                    required: true,
                    message: 'Email is required.',
                  },
                ]}
                className="account-input"
              >
                <Input size="large" placeholder="" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span className={styles.loginLabel}>
                password &nbsp;
                <span
                  className={`${styles.loginLabel} ${styles.loginRequired}`}
                >
                  *
                </span>
              </span>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                validateFirst={true}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: 'Password is required.',
                  },
                ]}
              >
                <Password size="large" style={{ marginTop: 8 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <button type="submit" className={styles.loginButton}>
                Log in
              </button>
            </Col>
            <Col>
              <button
                type="button"
                className={styles.loginButton}
                onClick={handleSsoClick}
              >
                Login with Keycloak
              </button>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%' }}>
                <span
                  style={{
                    fontSize: '17px',
                    textTransform: 'uppercase',
                    fontFamily: 'Gentium Basic',
                    letterSpacing: 2,
                    color: 'black',
                  }}
                >
                  No account?{' '}
                  <Link to="/register">
                    <span style={{ color: '#210535' }}>
                      <strong>Register</strong>
                    </span>
                  </Link>
                </span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
