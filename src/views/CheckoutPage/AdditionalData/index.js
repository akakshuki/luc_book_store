import React from 'react';
import { Row, Col } from 'antd';

import FormItem from '../FormItem';

const AdditionalData = (props) => {
  return (
    <Row style={{ marginTop: 24 }} gutter={[16, 16]}>
      <Col span={24}>
        <FormItem title="Order notes (optional)" name="note" />
      </Col>
    </Row>
  );
};

export default AdditionalData;
