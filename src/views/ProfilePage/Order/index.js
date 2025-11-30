import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Collapse, Tag } from 'antd';
import { useSelector } from 'react-redux';

import { getOrders } from 'api/apiRouter';
import { ORDER_STATUS } from 'utils/constant';

import OrderItem from './Orderitem';
import styles from '../style.module.css';
import './style.less';

const { Panel } = Collapse;

const Order = () => {
  const { orders = [], user } = useSelector((store) => store.user);

  const [userOrders, setUserOrders] = useState(orders ?? []);

  const fetchOrders = useCallback(async () => {
    const response = await getOrders(user?.id);
    console.log(response);
    // dispatch(actionCreator.actGetOrder({ userId: user?.id }));
    setUserOrders(response?.body);
  }, [user?.id]);

  useEffect(() => {
    fetchOrders();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Header = ({
    name,
    createdAt,
    total,
    totalSalePrice,
    totalOriginalSalePrice,
  }) => {
    return (
      <Row justify="space-between">
        <Col span={12}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <span className={styles.profileLabel}>Total Book: {total}</span>
            </Col>

            <Col span={24}>
              <span className={styles.profileLabel}>
                Order Date: {createdAt}
              </span>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Row justify="end">
                <span className={styles.profileLabel}>
                  Total Price: {totalSalePrice}
                </span>
              </Row>
            </Col>

            <Col span={24}>
              <Row justify="end">
                <span
                  className={styles.profileLabel}
                  style={{ textDecoration: 'line-through' }}
                >
                  Total Sale Price: {totalOriginalSalePrice}
                </span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Row>
          <span className={styles.specialHeading}>Order History</span>
        </Row>
      </Col>

      <Col span={24}>
        <Row justify="center" gutter={[0, 32]}>
          {userOrders?.map((it) => (
            <Collapse className="collapse-order" key={it?.id}>
              <Panel header={<Header {...it} />} key={it?.id}>
                {[
                  { field: 'Orderer', value: it?.name },
                  { value: it?.phone, field: 'Phone' },
                  { value: it?.createdAt, field: 'Order Date' },
                  { value: it?.note, field: 'Note' },
                ].map((item, idx) => (
                  <Col span={24} key={idx}>
                    <span className={styles.profileLabel}>
                      {item?.field}: {item?.value}
                    </span>
                  </Col>
                ))}

                <Col span={24}>
                  <span className={styles.profileLabel}>
                    Address: {it?.street}, {it?.ward}, {it?.district},{' '}
                    {it?.province}
                  </span>
                </Col>

                <Col span={24}>
                  <span className={styles.profileLabel}>
                    Status:
                    <Tag
                      color={
                        ORDER_STATUS.find((x) => x?.value === it?.status).color
                      }
                    >
                      {ORDER_STATUS.find((x) => x?.value === it?.status).label}
                    </Tag>
                  </span>
                </Col>

                <Col span={24}>
                  <Row justify="center" gutter={[16, 16]}>
                    {it?.orderDetails?.map((it) => (
                      <OrderItem {...it} key={it?.id} />
                    ))}
                  </Row>
                </Col>
              </Panel>
            </Collapse>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Order;
