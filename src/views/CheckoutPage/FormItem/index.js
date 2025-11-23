import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { isEmpty } from 'lodash';

import styles from './style.module.css';

const FormItem = (props) => {
  const { title, name, rules = [] } = props;
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <span className={styles.loginLabel}>
          {title} &nbsp;
          <span className={`${styles.loginLabel} ${styles.loginRequired}`}>
            {!isEmpty(rules) && '*'}
          </span>
        </span>
      </Col>

      <Col span={24}>
        <Form.Item name={name} rules={rules} className="account-input">
          <Input size="large" placeholder="" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormItem;
