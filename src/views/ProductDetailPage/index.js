import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, notification } from 'antd';
import { ShoppingOutlined, HeartOutlined } from '@ant-design/icons';
import { Link, navigate } from '@reach/router';
import truncate from 'lodash/truncate';
import sanitizeHtml from 'sanitize-html';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import useAddToCart from 'libs/hooks/useAddToCart';
import { actionCreators } from 'store/product/product.meta';
import { actionCreator as userActionCreator } from 'store/user/user.meta';
import NumberGroup from 'components/NumberGroup';
import { calculateSalePrice } from 'utils/calculateSalePrice';
import { buildProductCategoryUrl, buildImageUrl } from 'utils/urlBuilder';
import { getIdInSlug } from 'utils';
import styles from './style.module.css';

export const ProductImage = ({ productDetail }) => {
  return (
    <Col xs={24} sm={24} md={15}>
      <Row justify="center" style={{ perspective: '600px' }}>
        <Col
          span={24}
          className={`${styles.hasEdge} ${styles.bookItemWrapper}`}
        >
          <img src={buildImageUrl(productDetail)} alt="book" />

          {!!productDetail?.discount && (
            <div className={styles.bookSaleTagWrapper}>
              <span className={styles.bookSaleTag}>SALE!</span>
            </div>
          )}

          <div className={styles.readBookTagWrapper}>
            <span className={styles.readBookTag}>READ THE BOOK!</span>
          </div>

          <div className={styles.bookPriceTagWrapper}>
            <div
              style={{
                margin: '0 5px',
                textDecoration:
                  !!productDetail?.discount && productDetail?.discount > 0
                    ? 'line-through #d38d45'
                    : 'none',
              }}
            >
              <span
                style={{
                  color: '#d38d45',
                }}
              >
                $
              </span>
              <span className={styles.bookPriceTag}>
                {productDetail?.price}
              </span>
            </div>
            {!!productDetail?.discount && (
              <div style={{ margin: '0 5px' }}>
                <span style={{ color: '#d38d45' }}>$</span>
                <span className={styles.bookPriceTag}>
                  {calculateSalePrice(
                    productDetail?.price,
                    productDetail?.discount
                  )}
                </span>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Col>
  );
};

const ProductDetail = (props) => {
  const { slug } = props;
  const dispatch = useDispatch();
  const id = getIdInSlug(slug);

  const { user = {} } = useSelector((store) => store.user);
  const wishlists = user?.wishlists ?? [];
  const { productDetail } = useSelector((store) => store.product);
  const [count, setCount] = useState(productDetail?.count ?? 0);

  const addWishlist = () => {
    if (!isEmpty(user)) {
      dispatch(
        userActionCreator.addWishLists({
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

  const removeWishlist = () => {
    if (!isEmpty(user)) {
      dispatch(
        userActionCreator.removeWishLists({
          userId: user?.id,
          product: {
            id: id,
          },
        })
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    dispatch(actionCreators.getProductDetailById(id));
    scrollToTop();

    // eslint-disable-next-line
  }, [user, id]);

  return (
    <Row style={{ padding: '100px 0' }}>
      <Col span={20} offset={2}>
        <Row gutter={[0, 20]}>
          {/* Product Breadcrumb */}
          <Col span={24}>
            <Breadcrumb className={styles.breadcrumbStyle}>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={buildProductCategoryUrl(productDetail?.category)}>
                  {productDetail?.category?.name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className={styles.breadcrumbDisable}>
                {productDetail?.name ?? 'special book'}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>

          {/* Product Detail */}
          <Col xs={24} sm={24} md={10}>
            <Row justify="center">
              <ProductImage productDetail={{ ...productDetail }} />
            </Row>
          </Col>

          {/* Product Introduce */}
          <Col xs={24} sm={24} md={14}>
            <Row gutter={[0, 40]}>
              <Col span={24} style={{ marginBottom: '20px' }}>
                <h1
                  className={styles.specialHeading}
                  style={{ fontFamily: 'roboto', fontSize: '32px' }}
                >
                  {productDetail?.name}
                </h1>
              </Col>

              <Col span={24}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncate(
                      sanitizeHtml(
                        productDetail?.description ??
                          'This product no description!'
                      ),
                      {
                        length: 250,
                        separator: /,? +/,
                      }
                    ),
                  }}
                />

                <button
                  onClick={() => {
                    let elmnt = document.getElementById('description');
                    elmnt.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className={styles.seeMoreButton}
                >
                  See more
                </button>
              </Col>

              <Col span={24}>
                <NumberGroup
                  countChange={(count, type) => {
                    setCount(count);
                  }}
                  count={count}
                />
              </Col>

              <Col span={24}>
                <Row gutter={[16, 0]}>
                  <Col>
                    <button
                      className={`${styles.addToCartButton}`}
                      onClick={useAddToCart(
                        {
                          productDetail: productDetail,
                          count: count,
                        },
                        setCount
                      )}
                    >
                      <ShoppingOutlined
                        style={{ marginRight: '15px', fontSize: '1.2rem' }}
                      />
                      Add to cart
                    </button>
                  </Col>

                  {wishlists?.includes(productDetail?.id) ? (
                    <Col>
                      <button
                        className={`${styles.addToCartButton}`}
                        onClick={removeWishlist}
                      >
                        <HeartOutlined
                          style={{
                            marginRight: '15px',
                            fontSize: '1.2rem',
                          }}
                        />
                        Remove wishlist
                      </button>
                    </Col>
                  ) : (
                    <Col>
                      <button
                        className={`${styles.addToCartButton}`}
                        onClick={addWishlist}
                      >
                        <HeartOutlined
                          style={{
                            marginRight: '15px',
                            fontSize: '1.2rem',
                          }}
                        />
                        Add to wishlist
                      </button>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>

          {/* Product Description */}
          <Col span={24} id="description">
            <Row gutter={40}>
              <Col xs={24} sm={24} md={16}>
                <Row gutter={[0, 25]}>
                  <Col span={24} className={styles.descriptionTitleWrapper}>
                    <h2 className={styles.descriptionTitle}>Description</h2>
                  </Col>

                  <Col span={24}>
                    <div
                      className={styles.specialDescription}
                      dangerouslySetInnerHTML={{
                        __html: truncate(
                          sanitizeHtml(
                            productDetail?.description ??
                              'This product no description!'
                          ),
                          {
                            length: 250,
                            separator: /,? +/,
                          }
                        ),
                      }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col xs={0} sm={0} md={{ span: 6, offset: 1 }}>
                <Row>
                  <h3 className={styles.newLetter}>New Letter</h3>
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
                      className={`${styles.addToCartButton}`}
                      style={{ width: '100%' }}
                    >
                      subscribes
                    </button>
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

export default ProductDetail;
