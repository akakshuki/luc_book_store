import React from 'react';
import { Row, Col, Form, Button, Modal } from 'antd';
import { Link, navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { actionCreator } from 'store/user/user.meta';
import BillingDetail from './BillingDetail';
import AdditionalData from './AdditionalData';
import OrderDetail from './OrderDetail';
import styles from './style.module.css';

const CheckoutPage = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user = {} } = useSelector((store) => store.user);
  const {
    products = [],
    totalSalePrice,
    totalOriginalPrice,
    total,
  } = useSelector((store) => store.cart);

  const mappingToOrderDetail = () => {
    return products?.map((product) => ({
      product: {
        id: product.id,
      },
      count: product.count,
    }));
  };

  const handleSubmit = (values) => {
    if (!isEmpty(user)) {
      values.createdBy = user?.id;
      values.updatedBy = user?.id;
      values.orderDetails = mappingToOrderDetail();
      values.total = total;
      values.totalSalePrice = totalSalePrice;
      values.totalOriginalSalePrice = totalOriginalPrice;

      console.log(values);
      dispatch(actionCreator.actCheckout(values));
    } else
      Modal.error({
        title: 'Unauthorized',
        content: 'You must login to checkout!',
        onOk: () => navigate('/login'),
        okText: 'Login',
      });
  };

  return (
    <Row style={{ padding: '100px 0' }}>
      <Col span={20} offset={2}>
        <Row>
          {isEmpty(user) && (
            <Col span={24}>
              <div className={styles.returningCustomer}>
                Returning customer?{' '}
                <Link to="/login" className={styles.returningCustomerLink}>
                  Click here to login
                </Link>
              </div>
            </Col>
          )}

          <Col span={24}>
            <Form form={form} onFinish={handleSubmit} scrollToFirstError>
              <Row style={{ marginTop: 24 }} gutter={[16, 16]}>
                <Col span={12}>
                  <Row className={styles.cartTotalHeader}>
                    <h2 className={styles.cartTotalTitle}>Billing details</h2>
                  </Row>
                  <BillingDetail />
                </Col>

                <Col span={12}>
                  <Row className={styles.cartTotalHeader}>
                    <h2 className={styles.cartTotalTitle}>
                      Additional information
                    </h2>
                  </Row>
                  <AdditionalData />
                </Col>
                <Col span={24}>
                  <Row className={styles.cartTotalHeader}>
                    <h2 className={styles.cartTotalTitle}>Your order</h2>
                  </Row>
                  <OrderDetail />
                </Col>
                <Col span={24}>
                  <Row justify="end">
                    <Col>
                      <Button className={styles.viewBook} htmlType="submit">
                        Place order
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
