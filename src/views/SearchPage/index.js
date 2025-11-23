import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Input, Button, Empty, AutoComplete } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@reach/router';

import { searchProduct } from 'api/apiRouter';
import { actionCreators as categoryActionCreators } from 'store/category/category.meta';
import { buildProductCategoryUrl } from 'utils/urlBuilder';
import Banner from './Banner';
import BookList from './BookList';

import styles from './style.module.css';

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { categories } = useSelector((store) => store.category);

  const handleFetchSearchResult = async (value) => {
    if (value.length >= 3) {
      const { body } = await searchProduct(value);
      setProducts(body);
    }
  };

  useEffect(() => {
    dispatch(categoryActionCreators.getCategories());
  }, [dispatch]);

  return (
    <Row>
      <Col span={24}>
        <Banner />
      </Col>
      <Col span={20} offset={2}>
        <Row style={{ padding: '100px 0' }}>
          <Col span={24}>
            <Breadcrumb className={styles.breadcrumbStyle}>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className={styles.breadcrumbDisable}>
                Search
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <Row gutter={[0, 24]}>
                  <Col span={22} offset={1}>
                    <Row>
                      <Col span={12} style={{ fontWeight: 700 }}>
                        Showing all {products?.length} items
                      </Col>
                      <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <AutoComplete
                          style={{
                            width: 300,
                          }}
                          enterButton="Search"
                          size="large"
                          onSearch={handleFetchSearchResult}
                        >
                          <Input.Search
                            size="large"
                            placeholder="search keyword at least 3 letter"
                            enterButton
                            allowClear
                          />
                        </AutoComplete>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={22} offset={1}>
                    {products?.length > 0 ? (
                      <BookList data={products} />
                    ) : (
                      <Empty description="No search results" />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row style={{ marginBottom: '80px' }} gutter={[0, 16]}>
                  <Col span={24} className={styles.category}>
                    Categories
                  </Col>
                  {categories?.map((x) => (
                    <Col span={24} key={x?.id}>
                      <div className={styles.categorySlug}>
                        <Link to={buildProductCategoryUrl(x)}>{x?.name}</Link>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row style={{ marginBottom: '80px' }} gutter={[0, 16]}>
                  <Col span={24} className={styles.category}>
                    Blogs
                  </Col>
                  {categories?.map((x) => (
                    <Col span={24} key={x?.id}>
                      <div className={styles.categorySlug}>
                        <Link to={buildProductCategoryUrl(x)}>{x?.name}</Link>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div style={{ marginBottom: '30px' }}>
                  <div className={styles.category}>Newsletter</div>
                </div>
                <div style={{ marginLeft: '50px' }}>
                  <div className={styles.newsletter}>
                    Make sure you don't miss anything!
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <Input
                      style={{ padding: '13px 10% 13px 20px' }}
                      placeholder="Your e-mail address"
                    />
                  </div>
                  <div>
                    <Button
                      className={styles.subcribeButton}
                      style={{ width: '100%' }}
                    >
                      Subscribes
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductsPage;
