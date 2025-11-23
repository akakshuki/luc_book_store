import React, { useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { actionCreator } from 'store/user/user.meta';
import styles from '../style.module.css';
import './style.less';

const { Group } = Radio;

const MyAccount = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const { user } = useSelector((store) => store.user);

  const NEW_DATE_FORMAT = 'DD/MM/YYYY';

  useEffect(() => {
    if (!isEmpty(user)) {
      setFieldsValue({
        ...user,
        birthday: user?.birthday && moment(user?.birthday),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (value) => {
    let { phone, birthday, email, gender, name } = value;

    dispatch(
      actionCreator.updateUser({
        id: user?.id,
        name,
        birthday: birthday.toISOString(),
        gender,
        email,
        phone,
      })
    );
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Row>
          <span className={styles.specialHeading}>My Account</span>
        </Row>
      </Col>

      <Col span={24}>
        <Row justify="center">
          <Form
            form={form}
            style={{ width: '100%' }}
            onFinish={handleSubmit}
            scrollToFirstError
          >
            <Col xs={24}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Row>
                    <span className={styles.profileLabel}>Email</span>
                  </Row>

                  <Row>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'Email không hợp lệ',
                        },
                        {
                          required: true,
                          message: 'Vui lòng điền email',
                        },
                      ]}
                    >
                      <Input disabled={true} size="large" />
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row>
                    <span className={styles.profileLabel}>Full Name</span>
                  </Row>

                  <Row>
                    <Form.Item name="name">
                      <Input size="large" />
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row>
                    <span className={styles.profileLabel}>Phone</span>
                  </Row>

                  <Row>
                    <Form.Item
                      name="phone"
                      validateTrigger="onBlur"
                      rules={[
                        () => ({
                          validator(rule, value) {
                            if (isNaN(value)) {
                              return Promise.reject('Phone is invalid!');
                            }
                            if (value?.length === 10 && value[0] === '0') {
                              return Promise.resolve();
                            }
                            if (value?.length === 9) {
                              return Promise.resolve();
                            }
                            return Promise.reject('Phone is invalid!');
                          },
                        }),
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row>
                    <span className={styles.profileLabel}>Phone</span>
                  </Row>

                  <Row>
                    <Form.Item name="gender">
                      <Group>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                        <Radio value={3}>Other</Radio>
                      </Group>
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row>
                    <span className={styles.profileLabel}>Birthday</span>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item name="birthday">
                        <DatePicker
                          size="large"
                          style={{ width: '100%' }}
                          format={NEW_DATE_FORMAT}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Row
                      justify="center"
                      align="middle"
                      style={{ padding: 8, marginTop: 16 }}
                    >
                      <button type="submit" className={styles.btnSubmit}>
                        Update
                      </button>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default MyAccount;
