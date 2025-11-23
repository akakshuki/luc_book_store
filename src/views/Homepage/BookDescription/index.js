import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link, navigate } from '@reach/router';
import { ShoppingOutlined, ReadOutlined } from '@ant-design/icons';
import truncate from 'lodash/truncate';
import sanitizeHtml from 'sanitize-html';

import useAddToCart from 'libs/hooks/useAddToCart';
import {
  buildProductDetailUrl,
  buildProductCategoryUrl,
} from 'utils/urlBuilder';
import { calculateSalePrice } from 'utils/calculateSalePrice';
import styles from './style.module.css';

const BookDescription = (props) => {
  const { item } = props;
  return (
    <Row gutter={[0, 20]} style={{ position: 'sticky', top: 120, left: 0 }}>
      <Col span={24}>
        <Link to={buildProductDetailUrl(item)} className={styles.specialTitle}>
          {item?.name}
        </Link>
      </Col>
      <Col span={24}>
        <div className={styles.categorySlug}>
          <Link to={buildProductCategoryUrl(item?.category)}>
            {item?.category?.name}
          </Link>
        </div>
      </Col>
      <Col span={24}>
        <div
          className={styles.bookDescription}
          dangerouslySetInnerHTML={{
            __html: truncate(
              sanitizeHtml(item?.description ?? 'This product no description!'),
              {
                length: 450,
                separator: /,? +/,
              }
            ),
          }}
        />
      </Col>
      <Col span={24}>
        <p className={styles.bookPrice}>
          {item?.discount ? (
            <span>
              <span
                style={{
                  textDecoration: 'line-through',
                  fontSize: '19px',
                }}
              >
                <span className={styles.bookPriceIcon}>$</span>
                {item?.price}
              </span>
              &nbsp; &nbsp;
              <span style={{ fontSize: '30px' }}>
                <span className={styles.bookPriceIcon}>$</span>
                {calculateSalePrice(item?.price, item?.discount)}
              </span>
            </span>
          ) : (
            <span>
              <span style={{ fontSize: '30px' }}>{`$${item?.price}`}</span>
            </span>
          )}
        </p>
      </Col>
      <Col span={24}>
        <Button
          className={styles.viewBook}
          onClick={() => navigate(buildProductDetailUrl(item))}
        >
          <ReadOutlined style={{ marginRight: '10px', fontSize: '1.2rem' }} />
          View Book
        </Button>

        <Button
          className={styles.viewBook}
          onClick={useAddToCart({
            productDetail: { ...item },
            type: 'add single',
          })}
        >
          <ShoppingOutlined
            style={{ marginRight: '10px', fontSize: '1.2rem' }}
          />
          Add To Cart
        </Button>
      </Col>
    </Row>
  );
};
export default BookDescription;
