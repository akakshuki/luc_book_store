import React, { lazy } from 'react';
import { Link, Router, Redirect } from '@reach/router';
import { Result } from 'antd';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const Homepage = lazy(() => import('views/Homepage'));
const ProductDetailPage = lazy(() => import('views/ProductDetailPage'));
const LoginPage = lazy(() => import('views/LoginPage'));
const CartPage = lazy(() => import('views/CartPage'));
const ProductsPage = lazy(() => import('views/ProductsPage'));
const SearchPage = lazy(() => import('views/SearchPage'));
const ProfilePage = lazy(() => import('views/ProfilePage'));
const CheckoutPage = lazy(() => import('views/CheckoutPage'));

const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Hmm. Chúng tôi gặp khó khăn khi tìm trang web đó."
    extra={<Link to="/">Back Home</Link>}
  />
);

const Routes = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Router
      style={{
        backgroundColor: '--var(tertiary)',
        width: '100%',
        maxWidth: '1920px',
      }}
    >
      <Redirect from="/" to="home" noThrow />
      <Homepage path="home" />
      <ProductsPage path="product" />
      <ProductsPage path="product/:slug" />
      <ProductDetailPage path="product/detail/:slug" />
      <ProfilePage path="profile/:slug" />

      {isEmpty(user) ? (
        <LoginPage path="login" />
      ) : (
        <Redirect from="/login" to="/home" noThrow />
      )}

      {isEmpty(user) ? (
        <LoginPage path="register" />
      ) : (
        <Redirect from="/register" to="/home" noThrow />
      )}

      <CartPage path="cart" />
      <CheckoutPage path="checkout" />
      <SearchPage path="search" />
      <PageNotFound path="*" />
    </Router>
  );
};

export default Routes;
