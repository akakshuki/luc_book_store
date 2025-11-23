import React from 'react';
import { Row, Col } from 'antd';

import SideBar from '../SideBar';
import styles from './style.module.css';

const ProfileLayout = (props) => {
  const { path } = props;

  return (
    <Row className={styles.userInfoContainer}>
      <Col xs={24} md={22} xl={20}>
        <Row gutter={{ md: 16, xs: 0, sm: 0 }}>
          <Col xs={0} md={6}>
            <SideBar path={path} />
          </Col>

          <Col xs={24} md={18}>
            {props?.children}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileLayout;
