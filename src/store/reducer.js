import { combineReducers } from 'redux';

import page from './page/page.reducer';
import cart from './cart/cart.reducer';
import user from './user/user.reducer';
import product from './product/product.reducer';
import category from './category/category.reducer';

export default combineReducers({
  page,
  cart,
  user,
  product,
  category,
});
