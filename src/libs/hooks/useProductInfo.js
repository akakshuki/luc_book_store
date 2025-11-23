import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useProductInfo = (products) => {
  const { products: cartProducts = [], productWishlist = [] } = useSelector(
    (store) => ({
      products: store?.cart?.products,
      productWishlist: store?.user?.user?.wishlists,
    })
  );

  const enhancedProduct = useMemo(() => {
    console.log({ products });
    return products?.map((product, index) => {
      if (!product?.displayToUser) {
        products.splice(index, 1);
      }
      if (!product) return;
      const cartProduct = cartProducts.find((prod) => prod.id === product?.id);
      if (cartProduct) {
        product = { ...cartProduct };
        product.count = cartProduct.total;
      } else {
        product.count = 0;
      }
      product.isLike = productWishlist.includes(product?.id);
      return product;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, cartProducts, productWishlist]);

  return enhancedProduct;
};

export default useProductInfo;
