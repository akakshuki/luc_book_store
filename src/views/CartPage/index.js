import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import CartList from './CartList';
import CartTotal from './CartTotal';
import styles from './style.module.css';

const CartPage = (props) => {
  const { products = [] } = useSelector((store) => store.cart);

  return (
    <Row style={{ padding: '100px 0' }}>
      <Col span={20} offset={2}>
        <Row>
          <Col span={24}>
            <Row>
              <span className={styles.specialHeadingCart}>Cart</span>
            </Row>
          </Col>

          <Col span={24}>
            <CartList products={products} />
          </Col>
          <Col span={24}>
            <CartTotal products={products} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartPage;
