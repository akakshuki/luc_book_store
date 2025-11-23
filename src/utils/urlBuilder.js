import slugify from './slugify';

export const buildProductCategoryUrl = (category) =>
  `/product/${category?.slug ?? slugify(category?.name ?? 'product')}-${
    category?.id
  }`;

export const buildProductDetailUrl = (product) =>
  `/product/detail/${product?.slug ?? slugify(product?.name ?? 'book')}-${
    product?.id
  }`;

export const buildImageUrl = (product) =>
  `${process.env.REACT_APP_BACKEND_URL}/${product?.image}`;
