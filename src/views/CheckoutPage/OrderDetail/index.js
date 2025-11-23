import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import { calculateSalePrice } from 'utils/calculateSalePrice';
import styles from './style.module.css';

const OrderDetail = () => {
  const {
    products = [],
    totalSalePrice,
    totalOriginalPrice,
    totalTax,
  } = useSelector((store) => store.cart);

  return (
    <Row style={{ margin: '24px 0' }} gutter={[16, 16]}>
      <Col span={12}>
        <Row>
          <Col span={24}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle}`}
            >
              Product
            </div>
          </Col>
          {products?.map((product) => (
            <Col span={24} key={product?.id}>
              <div
                className={`${styles.cartTotalCell} ${styles.cartTotalCellContent}`}
              >
                {product?.name} x {product?.count}
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={24}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle}`}
            >
              Subtotal
            </div>
          </Col>
          {products?.map((product) => (
            <Col span={24} key={product?.id}>
              <div
                className={`${styles.cartTotalCell} ${styles.cartTotalCellContent}`}
              >
                ${calculateSalePrice(product?.price, product.discount)}
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              Subtotal
            </div>
          </Col>

          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              ${totalSalePrice}
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              VAT (10%)
            </div>
          </Col>

          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              ${totalTax}
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              Total
            </div>
          </Col>

          <Col span={12}>
            <div
              className={`${styles.cartTotalCell} ${styles.cartTotalCellTitle} ${styles.cartTotalCellTitleSub}`}
            >
              ${totalOriginalPrice}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderDetail;
