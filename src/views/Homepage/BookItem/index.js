import React from 'react';
import { Link } from '@reach/router';
import { Row } from 'antd';

import { buildProductDetailUrl, buildImageUrl } from 'utils/urlBuilder';
import styles from './style.module.css';

const BookItem = (props) => {
  const { item = {}, onHover } = props;

  return (
    <Row
      onMouseEnter={() => {
        onHover && onHover(item);
      }}
    >
      <Link
        to={buildProductDetailUrl(item)}
        style={{ display: 'block', width: '100%', perspective: '600px' }}
      >
        <div className={`${styles.hasEdge} ${styles.bookItemWrapper}`}>
          <img src={buildImageUrl(item)} alt="book" />
        </div>
        <div style={{ padding: '16px 0' }}>
          <h3 className={styles.specialHeading}>{item?.name}</h3>
        </div>
      </Link>
    </Row>
  );
};

export default BookItem;
