import React from 'react';
import { Link } from '@reach/router';
import { Row, Button } from 'antd';

import useAddToCart from 'libs/hooks/useAddToCart';
import { calculateSalePrice } from 'utils/calculateSalePrice';
import { buildProductDetailUrl, buildImageUrl } from 'utils/urlBuilder';
import styles from './style.module.css';

const BookItem = (props) => {
  const { item = {} } = props;

  return (
    <Row>
      <Link
        className={styles.productItemLink}
        to={buildProductDetailUrl(item)}
        style={{ display: 'block', width: '100%', perspective: '600px' }}
      >
        <div className={`${styles.hasEdge} ${styles.bookItemWrapper}`}>
          <img src={buildImageUrl(item)} alt="book" />
        </div>
        <div style={{ padding: '4px 0' }}>
          <h3 className={styles.specialHeading}>{item?.name}</h3>
        </div>
        <div style={{ padding: '4px 0' }}>
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
        </div>
      </Link>
      <div style={{ padding: '4px 0' }}>
        <Button
          type="link"
          className={styles.viewBook}
          onClick={useAddToCart({
            productDetail: { ...item },
            type: 'add single',
          })}
        >
          Add To Cart
        </Button>
      </div>
    </Row>
  );
};

export default BookItem;
