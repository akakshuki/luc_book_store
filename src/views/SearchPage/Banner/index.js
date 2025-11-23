import React from 'react';
import { Row, Col } from 'antd';

import styles from './style.module.css';

const Banner = () => {
  return (
    <Row
      className={styles.bannerBackground}
      style={{
        background: `url(/assets/images/david_-_the_death_of_socrates.jpg)`,
      }}
    >
      <Col span={6} offset={2} style={{ padding: '70px 0' }}>
        <div>
          <h1 className={styles.specialHeading}>Search</h1>
        </div>
      </Col>
    </Row>
  );
};

export default Banner;
