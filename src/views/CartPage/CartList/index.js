import React from 'react';
import { Row, Col, Empty } from 'antd';

import CartItem from '../CartItem';
import styles from './style.module.css';

const CartList = (props) => {
  const { products = [] } = props;
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col md={3}>
            <Row className={styles.cartListHeader}>
              <span style={styles.cartListTitle}>Action</span>
            </Row>
          </Col>
          <Col md={5}>
            <Row className={styles.cartListHeader}>
              <span style={styles.cartListTitle}>Image</span>
            </Row>
          </Col>
          <Col md={7}>
            <Row className={styles.cartListHeader}>
              <span style={styles.cartListTitle}>Name</span>
            </Row>
          </Col>
          <Col md={5}>
            <Row className={styles.cartListHeader}>
              <span style={styles.cartListTitle}>Quantity</span>
            </Row>
          </Col>
          <Col md={4}>
            <Row className={styles.cartListHeader}>
              <span style={styles.cartListTitle}>Total</span>
            </Row>
          </Col>
        </Row>
      </Col>

      {products?.length > 0 ? (
        products?.map((it) => <CartItem key={it?.id} {...it} />)
      ) : (
        <Col span={24}>
          <Empty description="Your cart is empty" />
        </Col>
      )}
    </Row>
  );
};

export default CartList;
