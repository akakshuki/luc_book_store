import React from 'react';
import { Row, Col, Space } from 'antd';
import { Link } from '@reach/router';

import { buildProductCategoryUrl } from 'utils/urlBuilder';
import styles from './style.module.css';

const FooterClient = () => {
  //get api
  const categoriesShowFooter = [
    {
      id: 1,
      name: 'Adventure',
      description: '',
      slug: 'adventure',
    },
    {
      id: 2,
      name: 'Young Adult',
      description: '',
      slug: 'young-adult',
    },
    {
      id: 3,
      name: 'Mistery',
      description: '',
      slug: 'mistery',
    },
    {
      id: 4,
      name: 'Romance',
      description: '',
      slug: 'romance',
    },
  ];

  const information = [
    {
      id: 1,
      name: 'About us',
      link: '/about',
    },
    {
      id: 2,
      name: 'Contact us',
      link: '/contact',
    },
    {
      id: 3,
      name: 'Blog',
      link: '/blog',
    },
  ];

  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.060360274028!2d106.71160187469765!3d10.806689089343914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e0!3m2!1svi!2s!4v1685444686217!5m2!1svi!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <Row
        style={{
          padding: '70px 0',
          backgroundImage: 'url("/assets/images/pattern_3.png")',
        }}
      >
        <Col xs={{ span: 21, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Row justify="center" gutter={[0, 40]}>
            <Col span={24} className={styles.footerLogo}>
              <h1 className={styles.specialHeading}>NVL Book Store</h1>
            </Col>

            <Col span={24}>
              <Row justify="space-between" gutter={[60, 20]}>
                <Col span={8}>
                  <Row>
                    <h3 className={styles.headingStyle}>New Letter</h3>
                  </Row>

                  <Row
                    style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      marginBottom: '20px',
                    }}
                  >
                    Make sure you don't miss anything!
                  </Row>

                  <Row>
                    <input
                      type="email"
                      placeholder="You e-mail address"
                      className={styles.inputStyle}
                    />
                  </Row>

                  <Row>
                    <Col xs={24}>
                      <button
                        className={`${styles.subscribesButton}`}
                        style={{ width: '100%' }}
                      >
                        subscribes
                      </button>
                    </Col>
                  </Row>
                </Col>

                <Col span={8}>
                  <Row>
                    <h3 className={styles.headingStyle}>Book Categories</h3>
                  </Row>

                  <Row gutter={[0, 16]}>
                    {categoriesShowFooter.map((it) => (
                      <Col span={24} key={it?.id}>
                        <Link
                          to={buildProductCategoryUrl(it)}
                          className={styles.categoryItem}
                        >
                          {it?.name}
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Col>

                <Col span={8}>
                  <Row>
                    <h3 className={styles.headingStyle}>Information</h3>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <Row gutter={[0, 16]}>
                        {information.map((it) => (
                          <Col span={24} key={it?.id}>
                            <Link to={it?.link} className={styles.categoryItem}>
                              {it?.name}
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Col>

                    <Col span={14}>
                      <Space style={{ marginTop: 32 }} size="middle">
                        <div className={styles.footerSocialIcon}>
                          <Link to="/">
                            <img
                              src="/assets/images/twitter.svg"
                              alt="twitter"
                            />
                          </Link>
                        </div>
                        <div className={styles.footerSocialIcon}>
                          <Link to="/">
                            <img
                              src="/assets/images/facebook.svg"
                              alt="facebook"
                            />
                          </Link>
                        </div>
                        <div className={styles.footerSocialIcon}>
                          <Link to="/">
                            <img
                              src="/assets/images/youtube.svg"
                              alt="youtube"
                            />
                          </Link>
                        </div>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row justify="center">
                <span className={styles.footerCopyright}>
                  <strong>© Bookstore 2020</strong>
                </span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default FooterClient;
