import { useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { actionCreators as cartActionCreators } from 'store/cart/cart.meta';

const useAddToCart = (
  { productDetail, count, type = 'add input' },
  setCount
) => {
  const reduxDispatch = useDispatch();
  const { products = [] } = useSelector((store) => store.cart);
  const existingProduct = products.find(
    (product) => product?.id === productDetail?.id
  );

  const handleUpdateState = () => {
    if (!isEmpty(productDetail)) {
      productDetail.count = existingProduct ? existingProduct?.count ?? 0 : 0;
      if (setCount) {
        setCount(productDetail?.count);
      }
    }
  };

  useEffect(() => {
    handleUpdateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  return () => {
    const data = {
      ...productDetail,
      count:
        type === 'add single'
          ? (count ?? productDetail?.count) + 1
          : count ?? productDetail?.count,
      message: existingProduct ? 'Updated success' : 'Added success',
    };

    if (count ?? productDetail?.count > 0) {
      reduxDispatch(cartActionCreators.addToCart(data));
    } else {
      if (type === 'add single') {
        reduxDispatch(cartActionCreators.addToCart(data));
      } else {
        notification.warning({
          message: 'Please input quantity!',
          top: 100,
        });
      }
    }
  };
};

export default useAddToCart;
