import React from 'react';
import { Row, Col } from 'antd';

import styles from './style.module.css';

const Banner = () => {
  return (
    <Row
      className={styles.bannerBackground}
      style={{
        background: `url('assets/images/david_-_the_death_of_socrates.jpg')`,
      }}
    >
      <Col span={6} offset={2} style={{ padding: '70px 0' }}>
        <div>
          <div>
            <h1 className={styles.specialHeading} style={{ color: 'white' }}>
              Sell Your Book
            </h1>
            <div className={styles.specialSubtitle} style={{ color: 'white' }}>
              NVL - I know that I don't know
            </div>
          </div>

          <div className={styles.textContainer}>
            <p className={styles.textLanding} style={{ color: 'white' }}>
              Odrin is a theme specifically created for authors and writes to
              present and sell their books online. Soufflé tart sweet roll
              carrot cake icing bear claw dessert oat cake. Lollipop ice cream
              danish jelly beans cotton candy liquorice cotton candy lemon drops
              halvah.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Banner;
