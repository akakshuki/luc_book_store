import React from 'react';
import { Row, Col } from 'antd';

import FormItem from '../FormItem';

const BillingDetail = (props) => {
  return (
    <Row style={{ marginTop: 24 }} gutter={[16, 16]}>
      <Col span={12}>
        <FormItem
          title="NAME"
          name="name"
          rules={[
            {
              required: true,
              message: 'Name is required.',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <FormItem
          title="PHONE"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            () => ({
              validator(rule, value) {
                if (isNaN(value)) {
                  return Promise.reject('Invalid phone number!');
                }
                if (value?.length === 10 && value[0] === '0') {
                  return Promise.resolve();
                }
                if (value?.length === 9) {
                  return Promise.resolve();
                }
                return Promise.reject('Invalid phone number!');
              },
            }),
          ]}
        />
      </Col>
      <Col span={12}>
        <FormItem
          title="STREET"
          name="street"
          rules={[
            {
              required: true,
              message: 'Street is required.',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <FormItem
          title="WARD"
          name="ward"
          rules={[
            {
              required: true,
              message: 'Ward is required.',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <FormItem
          title="DISTRICT"
          name="district"
          rules={[
            {
              required: true,
              message: 'District is required.',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <FormItem
          title="PROVINCE"
          name="province"
          rules={[
            {
              required: true,
              message: 'Province is required.',
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default BillingDetail;
