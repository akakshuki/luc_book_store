import React, { useState, useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import { useSelector } from 'react-redux';

import BookList from 'views/SearchPage/BookList';
import styles from '../style.module.css';

const Wishlist = () => {
  const { user } = useSelector((store) => store.user);
  const { productWishlist = [] } = user;
  const [products, setProducts] = useState(productWishlist ?? []);

  useEffect(() => {
    setProducts(productWishlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Row>
          <span className={styles.specialHeading}>Wishlist</span>
        </Row>
      </Col>

      <Col span={24}>
        <Col span={22} offset={1}>
          {products?.length > 0 ? (
            <Row>
              <BookList data={products} />
            </Row>
          ) : (
            <Empty description="No search results" />
          )}
        </Col>
      </Col>
    </Row>
  );
};

export default Wishlist;
