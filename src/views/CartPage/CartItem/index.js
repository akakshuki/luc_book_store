import React from 'react';
import { Row, Col } from 'antd';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { actionCreators } from 'store/cart/cart.meta';
import { buildProductDetailUrl, buildImageUrl } from 'utils/urlBuilder';
import { StyledInput, NumberButton } from 'components/NumberGroup';
import { calculateSalePrice } from 'utils/calculateSalePrice';
import styles from './style.module.css';

export const NumberDelete = styled.button`
  cursor: pointer;
  background-color: red;
  color: white;
  width: 50px;
  height: 40px;
  border-radius: 2px;
  border: none;
  padding: 0px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: white;
    font-weight: bold;
  }
`;

const CartItem = (props) => {
  const reduxDispatch = useDispatch();
  const { id, name, price, discount, count } = props;

  return (
    <>
      <Col md={3} className={styles.cartListItem}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <NumberDelete
            onClick={() => {
              reduxDispatch(actionCreators.removeFromCart({ productId: id }));
            }}
          >
            X
          </NumberDelete>
        </Row>
      </Col>
      <Col md={5} className={styles.cartListItem}>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%', padding: '10px 0' }}
        >
          <img
            src={buildImageUrl(props)}
            style={{ width: 60 }}
            alt="product-cart-img"
          />
        </Row>
      </Col>
      <Col md={7} className={styles.cartListItem}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Link to={buildProductDetailUrl({ ...props })}>
            <span>{name}</span>
          </Link>
        </Row>
      </Col>
      <Col md={5} className={styles.cartListItem}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={24}>
            <Row align="middle" justify="center">
              <NumberButton
                onClick={() => {
                  reduxDispatch(
                    actionCreators.addToCart({ id, count: count - 1 })
                  );
                }}
              >
                <span>-</span>
              </NumberButton>

              <span style={{ marginLeft: 10, marginRight: 10 }}>
                <StyledInput
                  value={count || 1}
                  size="large"
                  inputMode="numeric"
                  pattern="[1-9]*"
                />
              </span>
              <NumberButton
                onClick={() => {
                  reduxDispatch(
                    actionCreators.addToCart({ id, count: count + 1 })
                  );
                }}
                add
              >
                <span>+</span>
              </NumberButton>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={4} className={styles.cartListItem}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <span>${calculateSalePrice(price, discount)}</span>
        </Row>
      </Col>
    </>
  );
};

export default CartItem;
