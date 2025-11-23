import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from '@reach/router';
import { useDispatch } from 'react-redux';

import { actionCreator } from 'store/user/user.meta';
import styles from '../../style.module.css';

const { Password } = Input;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    return dispatch(actionCreator.register({ ...values }));
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row>
        <Col span={24}>
          <Row>
            <span className={styles.specialHeadingLogin}>Register</span>
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

          <Row>
            <Col span={24}>
              <span className={styles.loginLabel}>
                password confirm &nbsp;
                <span
                  className={`${styles.loginLabel} ${styles.loginRequired}`}
                >
                  *
                </span>
              </span>
            </Col>

            <Col span={24}>
              <Form.Item
                name="repeatPassword"
                dependencies={['password']}
                validateFirst={true}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: 'Re-entered password',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Re-entered password is incorrect');
                    },
                  }),
                ]}
              >
                <Password size="large" style={{ marginTop: 8 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <button type="submit" className={styles.loginButton}>
                Register
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
                  You have an account?{' '}
                  <Link to="/login">
                    <span style={{ color: '#210535' }}>
                      <strong>Login</strong>
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

export default RegisterForm;
