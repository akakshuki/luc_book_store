const calculateSalePrice = (price, discount) => {
  if (discount && discount > 0) {
    return Math.round((1 - discount) * price);
  }
  return price;
};

export { calculateSalePrice };
