import React from 'react';
import { Row, Col, Menu, Dropdown, Badge, Modal } from 'antd';
import {
  DownOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { actionCreator } from 'store/user/user.meta';
import styles from './style.module.css';

const StyledSpan = styled.span`
  &:hover {
    color: var(--secondary);
  }
`;

const { confirm } = Modal;

const HeaderClient = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { total = 0 } = useSelector((store) => store.cart);

  const menus = {
    left: [
      // {
      //   name: 'Page',
      //   child: [
      //     {
      //       id: 1,
      //       name: 'Contact us',
      //       link: '/',
      //     },
      //     {
      //       id: 2,
      //       name: 'About us',
      //       link: '/',
      //     },
      //     {
      //       id: 3,
      //       name: 'Blog',
      //       link: '/',
      //     },
      //   ],
      // },
    ],
    right: [
      {
        id: 4,
        name: 'Account',
        link: '/profile/my-account',
      },
      {
        id: 5,
        name: 'Order history',
        link: '/profile/orders',
      },
      {
        id: 7,
        name: 'Wishlist',
        link: '/profile/wishlist',
      },
      {
        id: 8,
        name: 'Logout',
        onClick: () => {
          confirm({
            okText: 'Logout',
            cancelText: 'Cancel',
            title: 'Are you sure you want to logout!',
            onOk() {
              dispatch(actionCreator.logout());
            },
          });
        },
      },
    ],
  };

  const DropdownMenu = (props) => {
    const { name, data = [] } = props;

    const menu = (
      <Menu className={styles.subMenu}>
        {data?.map((item) => (
          <Menu.Item className={styles.subMenuItem} key={item?.id}>
            {item?.onClick ? (
              <StyledSpan onClick={item?.onClick}>{item?.name}</StyledSpan>
            ) : (
              <Link to={`${item?.link}`}>{item?.name}</Link>
            )}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Link to="/" className={styles.menuItem}>
          {name}&nbsp;
          <DownOutlined style={{ fontSize: '0.65rem' }} />
        </Link>
      </Dropdown>
    );
  };

  // console.log(user.name.length);

  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <Row justify="center">
          {/* for mobile */}
          <Col xs={24} sm={24}></Col>

          {/* for desktop */}
          <Col md={24}>
            <Row justify="space-around" gutter={[16, 0]}>
              <Col span={9}>
                <Row justify="end" align="middle" className={styles.menu}>
                  <Link to="/" className={styles.menuItem}>
                    Home
                  </Link>
                  {menus?.left?.map((it, idx) => (
                    <DropdownMenu key={idx} name={it?.name} data={it?.child} />
                  ))}
                  {/* <Link to="/" className={styles.menuItem}>
                    Blog
                  </Link> */}

                  <Link to="/product" className={styles.menuItem}>
                    Shop
                  </Link>
                </Row>
              </Col>
              <Col span={6} className={styles.headerLogo}>
                <Link to="/">
                  <Row justify="center">
                    <h1>NVL Book Store</h1>
                  </Row>
                </Link>
              </Col>
              <Col span={9}>
                <Row
                  justify="space-around"
                  align="middle"
                  className={styles.menu}
                >
                  <Col className={styles.menuItem}>
                    <Link to="/search">
                      <SearchOutlined style={{ fontSize: '1.2rem' }} />
                    </Link>
                  </Col>

                  <Col className={styles.menuItem}>
                    <Link to="/cart">
                      <Badge
                        count={total}
                        size="small"
                        style={{ backgroundColor: '#210535' }}
                      >
                        <Link to="/cart">
                          <ShoppingOutlined style={{ fontSize: '1.2rem' }} />
                        </Link>
                      </Badge>
                    </Link>
                  </Col>

                  <Col className={styles.menuItem}>
                    {isEmpty(user) ? (
                      <Link to="/login">
                        <UserOutlined style={{ fontSize: '1.2rem' }} />
                      </Link>
                    ) : (
                      <DropdownMenu
                        name={`Hi, ${user?.name ?? 'guest'}`}
                        data={menus?.right}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default HeaderClient;
