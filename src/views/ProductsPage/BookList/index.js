import React from 'react';
import { Row, Col } from 'antd';

import BookItem from '../BookItem';
import useProductInfo from 'libs/hooks/useProductInfo';

const BookList = (props) => {
  const { data = [] } = props;
  return (
    <Row gutter={[16, 16]}>
      {useProductInfo(data)?.map((item) => (
        <Col span={8} key={item?.id}>
          <BookItem item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
