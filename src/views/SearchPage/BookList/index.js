import React from 'react';
import { Row, Col, notification } from 'antd';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import BookItem from '../BookItem';
import useProductInfo from 'libs/hooks/useProductInfo';
import { actionCreator } from 'store/user/user.meta';
import styles from '../style.module.css';

const BookList = (props) => {
  const dispatch = useDispatch();
  const { data = [] } = props;

  const { user } = useSelector((store) => store.user);

  const addWishlist = (id) => {
    if (!isEmpty(user)) {
      dispatch(
        actionCreator.addWishLists({
          userId: user?.id,
          product: {
            id: id,
          },
        })
      );
    } else {
      notification.warning({ message: 'Please login for add wishlist!' });
      navigate('/login');
    }
  };

  const removeWishlist = (id) => {
    if (!isEmpty(user)) {
      dispatch(
        actionCreator.removeWishLists({
          userId: user?.id,
          product: {
            id: id,
          },
        })
      );
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {useProductInfo(data)?.map((item) => (
        <Col span={8} key={item?.id}>
          <BookItem item={item} />

          {item?.isLike ? (
            <Row
              justify="center"
              onClick={() => removeWishlist(item?.id)}
              style={{ marginTop: 20 }}
            >
              <button className={styles.btnSubmit}>Remove wishlist</button>
            </Row>
          ) : (
            <Row
              justify="center"
              style={{ marginTop: 20 }}
              onClick={() => addWishlist(item?.id)}
            >
              <button className={styles.btnSubmit}>Add to wishlist</button>
            </Row>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
