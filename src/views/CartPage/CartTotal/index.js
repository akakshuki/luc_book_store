import React from 'react';
import { Row, Col, Button } from 'antd';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';

import styles from './style.module.css';

const CartTotal = (props) => {
  const { totalSalePrice, totalOriginalPrice, totalTax } = useSelector(
    (store) => store.cart
  );
  return (
    <Row justify="end" style={{ margin: '40px 0px' }}>
      <Col span={10} className={styles.cartTotalHeaderBlock}>
        <div className={styles.cartTotalHeader}>
          <h2 className={styles.cartTotalTitle}>Cart totals</h2>
        </div>
        <Row className={styles.cartTotalTable} gutter={[16, 16]}>
          <Col span={8}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle}`}
            >
              Subtotal
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.cartTotalCell}>${totalSalePrice}</div>
          </Col>
          <Col span={8}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle}`}
            >
              VAT (10%)
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.cartTotalCell}>${totalTax}</div>
          </Col>
          <Col span={8}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              Total
            </div>
          </Col>
          <Col span={16}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              ${totalOriginalPrice}
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '40px 0' }}>
          <Button
            className={styles.viewBook}
            onClick={() => navigate('/checkout')}
          >
            Proceed to checkout
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default CartTotal;
