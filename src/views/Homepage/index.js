import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel } from 'antd';
import { ShoppingOutlined, ReadOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import truncate from 'lodash/truncate';
import sanitizeHtml from 'sanitize-html';

import useAddToCart from 'libs/hooks/useAddToCart';
import { actionCreators } from 'store/product/product.meta';
import { ProductImage } from 'views/ProductDetailPage';
import Banner from './Banner';
import BookList from './BookList';
import BookDescription from './BookDescription';
import useProductInfo from 'libs/hooks/useProductInfo';
import { buildProductDetailUrl } from 'utils/urlBuilder';
import styles from './style.module.css';
import './style.less';

const Homepage = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((store) => store.product);

  const bookListDataInfo = useProductInfo(products);

  const [activeBook, setActiveBook] = useState(bookListDataInfo[0]);
  const [activeBookSlider, setActiveBookSlider] = useState(bookListDataInfo[0]);

  const SlickPrev = ({ currentSlide, slideCount, ...props }) => {
    return (
      <div
        {...props}
        className={classnames({
          'slick-prev slick-arrow': true,
          'slick-disabled': currentSlide === 0,
        })}
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
      >
        <div
          onClick={() => setActiveBookSlider(bookListDataInfo[currentSlide])}
        />
      </div>
    );
  };

  const SlickNext = ({ currentSlide, slideCount, ...props }) => {
    return (
      <div
        {...props}
        className={classnames({
          'slick-next slick-arrow': true,
          'slick-disabled': currentSlide === slideCount - 1,
        })}
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
      >
        <div
          onClick={() => setActiveBookSlider(bookListDataInfo[currentSlide])}
        />
      </div>
    );
  };

  const setting = {
    initialSlide: 0,
    arrows: true,
    centerMode: true,
    focusOnSelect: false,
    draggable: true,
    autoplaySpeed: 5000,
    dots: true,
    autoplay: true,
    lazyLoad: true,
    infinite: true,
    nextArrow: <SlickNext />,
    prevArrow: <SlickPrev />,
    beforeChange: (current, next) =>
      setActiveBookSlider(bookListDataInfo[Number(next)]),
  };

  const Template = (props) => {
    return (
      <div className={styles.templateContainer}>
        <div className={styles.templateName}>{props?.name}</div>
        <div
          className={styles.templateDescription}
          dangerouslySetInnerHTML={{
            __html: truncate(
              sanitizeHtml(
                props?.description ?? 'This product no description!'
              ),
              {
                length: 450,
                separator: /,? +/,
              }
            ),
          }}
        />
        <div style={{ paddingBottom: '50px' }}>
          <button
            className={styles.viewBookTemplate}
            onClick={() => navigate(buildProductDetailUrl({ ...props }))}
          >
            <ReadOutlined style={{ marginRight: '15px', fontSize: '1.2rem' }} />
            View Book
          </button>

          <button
            className={styles.viewBookTemplate}
            onClick={useAddToCart({
              productDetail: { ...props },
              type: 'add single',
            })}
          >
            <ShoppingOutlined
              style={{ marginRight: '15px', fontSize: '1.2rem' }}
            />
            Add To Cart
          </button>
        </div>
      </div>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
    dispatch(actionCreators.getProductShowToHomepage());
    setActiveBook(bookListDataInfo[0]);
    setActiveBookSlider(bookListDataInfo[0]);
    // eslint-disable-next-line
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Banner />
      </Col>
      <Col style={{ padding: '120px 0' }} span={22} offset={1}>
        <Row style={{ padding: '40px 0' }}>
          <Col
            span={24}
            style={{ textAlign: 'center' }}
            className={styles.specialHeading}
          >
            Featured Book
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ padding: '100px 30px 200px 30px' }}>
          <Col span={12}>
            <BookList onHover={setActiveBook} data={bookListDataInfo} />
          </Col>
          <Col span={12} style={{ padding: '0 100px' }}>
            <BookDescription item={activeBook} />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row
          className={styles.parallaxBanner}
          style={{
            backgroundImage:
              'url("/assets/images/book_opened2-e1502204273659.jpg")',
          }}
        >
          <Col span={24}>
            <Row justify="end">
              <Col span={12}>
                <Row gutter={[0, 20]}>
                  <Col span={24}>
                    <Row justify="center">
                      <span
                        className={`${styles.specialHeading} ${styles.parallaxHeading}`}
                      >
                        Dash Into the Journey
                      </span>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Row justify="center">
                      <span className={styles.parallaxSubTitle}>
                        Explore The World Now
                      </span>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Row justify="center">
                      <button
                        className={styles.gotoShopButton}
                        style={{ width: '100%' }}
                        onClick={() => navigate('/shop')}
                      >
                        Go to shop
                      </button>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={22} offset={1}>
        <Row justify="space-between" style={{ padding: '100px 0' }}>
          <Col span={14}>
            <Row justify="center" gutter={[0, 40]}>
              <Col
                span={24}
                style={{ textAlign: 'center' }}
                className={styles.specialHeading}
              >
                Book of the Month
              </Col>

              <Col
                span={24}
                style={{
                  verticalAlign: 'center',
                }}
              >
                <Carousel {...setting}>
                  {bookListDataInfo?.map((item, idx) => (
                    <Template key={idx} idx={idx} {...item} />
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Col>

          <Col span={10}>
            <Row justify="center">
              <ProductImage productDetail={activeBookSlider} />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Homepage;
