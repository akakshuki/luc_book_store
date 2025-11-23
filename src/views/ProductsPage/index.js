import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Breadcrumb, Select, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@reach/router';

import useProductInfo from 'libs/hooks/useProductInfo';
import { getIdInSlug } from 'utils';
import { actionCreators as categoryActionCreators } from 'store/category/category.meta';
import { actionCreators as productActionCreators } from 'store/product/product.meta';
import { buildProductCategoryUrl } from 'utils/urlBuilder';
import Banner from './Banner';
import BookList from './BookList';
import styles from './style.module.css';

const { Option } = Select;

const ProductsPage = (props) => {
  const { slug = 'shop' } = props;
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const { categoryDetail, categories } = useSelector((store) => store.category);
  const [bookList, setBookList] = useState([]);
  const [sort, setSort] = useState('default');
  const id = slug !== 'shop' ? getIdInSlug(slug) : false;

  const bookListDataInfo = useProductInfo(
    id ? categoryDetail?.products : products
  );

  const handleSort = (value) => {
    setSort(value);
  };

  const sortBook = useCallback(
    (sortCase) => {
      if (bookList.length) {
        let newBookList = [...bookList];

        switch (sortCase) {
          case 'nameAZ':
            newBookList = newBookList.sort((a, b) =>
              ('' + a.name).localeCompare(b.name)
            );
            break;
          case 'nameZA':
            newBookList = newBookList.sort((a, b) =>
              ('' + b.name).localeCompare(a.name)
            );
            break;
          case 'priceLowHigh':
            newBookList = newBookList.sort((a, b) => a.price - b.price);
            break;
          case 'priceHighLow':
            newBookList = newBookList.sort((a, b) => b.price - a.price);
            break;
          case 'default':
            newBookList = [...bookListDataInfo];
            break;
          default:
            break;
        }
        setBookList(newBookList);
      }
    },
    // eslint-disable-next-line
    [sort]
  );

  useEffect(() => {
    if (id) {
      dispatch(categoryActionCreators.getCategoryDetail(id));
    } else dispatch(productActionCreators.getProductShowToHomepage());

    dispatch(categoryActionCreators.getCategories());
  }, [id, dispatch]);

  useEffect(() => {
    setBookList(bookListDataInfo);
    // eslint-disable-next-line
  }, [bookListDataInfo?.length]);

  useEffect(() => {
    sortBook(sort);
  }, [sort, sortBook]);

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
                {id ? categoryDetail?.name : 'shop'}
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
                        Showing all {bookList?.length} items
                      </Col>
                      <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Select
                          defaultValue={sort}
                          style={{ width: 180 }}
                          onChange={handleSort}
                        >
                          <Option value="default">Default</Option>
                          <Option value="nameAZ">Name AZ</Option>
                          <Option value="nameZA">Name ZA</Option>
                          <Option value="priceLowHigh">Price Low High</Option>
                          <Option value="priceHighLow">Price High Low</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={22} offset={1}>
                    <BookList data={bookList} />
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
