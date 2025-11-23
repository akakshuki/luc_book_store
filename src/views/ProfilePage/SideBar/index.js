import React from 'react';
import { Row, Menu } from 'antd';
import { navigate } from '@reach/router';

import styles from './style.module.css';

const { Item } = Menu;

const SideBar = (props) => {
  const { path } = props;

  return (
    <Row>
      <Menu defaultSelectedKeys={path} style={{ width: '100%' }}>
        <Item onClick={() => navigate('/profile/my-account')} key="my-account">
          <span className={styles.itemMenu}>My account</span>
        </Item>
        <Item onClick={() => navigate('/profile/orders')} key="orders">
          <span className={styles.itemMenu}>Orders management</span>
        </Item>
        <Item onClick={() => navigate('/profile/wishlist')} key="wishlist">
          <span className={styles.itemMenu}>Wishlist</span>
        </Item>
      </Menu>
    </Row>
  );
};

export default SideBar;
