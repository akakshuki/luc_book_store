import React from 'react';
import { Row, Col } from 'antd';

import BookItem from 'views/SearchPage/BookItem';
import styles from '../../style.module.css';

const OrderItem = (props) => {
  require('dotenv').config();

  const { count, product } = props;

  return (
    <Col span={12}>
      <Row
        gutter={[0, 32]}
        style={{ border: '1px solid #333', padding: 15, margin: '15px 0' }}
      >
        <Col span={24}>
          <span
            className={styles.profileLabe}
            style={{ fontSize: 22 }}
          >{`Quantity: ${count}`}</span>
        </Col>

        <Col span={24}>
          <Row justify="center">
            <Col span={12}>
              <BookItem item={product} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default OrderItem;
