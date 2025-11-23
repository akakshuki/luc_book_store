import { buildRequest } from 'api';
import cookie from 'js-cookie';

// Product
export const getProductsToHomepage = () =>
  buildRequest(`/product/showToHome`, {
    method: 'GET',
  }).request();

export const getProductById = (id) =>
  buildRequest(`/product/getById/${id}`, { method: 'GET' }).request();

export const searchProduct = (keyword) =>
  buildRequest(`/product/search?keyword=${keyword}`, {
    method: 'GET',
  }).request();

// Category
export const getCategories = () => {
  return buildRequest(`/category/showToUser`, {
    method: 'GET',
  }).request();
};

export const getCategoriesShowToFooter = () => {
  return buildRequest(`/category/showToFooter`, {
    method: 'GET',
  }).request();
};

export const getCategoryById = (id) => {
  return buildRequest(`/category/getById/${id}`, {
    method: 'GET',
  }).request();
};

export const getProductByCategoryId = (id) => {
  return buildRequest(`/category/products/${id}`, {
    method: 'GET',
  }).request();
};

// =========== User Request ========
const token = cookie.get('token');

export const getOrders = (id) =>
  buildRequest(`/order/getUserOrders/${id}`).request({ method: 'GET' });

export const getAddresses = (id) =>
  buildRequest(`/user/addresses`, {
    headers: { token: token, uid: id },
  }).request({ method: 'POST' });

// Wishlist
export const addWishlist = (data) =>
  buildRequest(`/wishlist/saveOrUpdate`, {
    method: 'POST',
  }).request({ data: data });

export const deleteWishlist = (data) =>
  buildRequest(`/wishlist/delete`).request({
    method: 'POST',
    data: data,
  });

export const getUser = (token) =>
  buildRequest(`/user/getUser`).request({
    headers: { token: token },
    method: 'GET',
  });

export const updateUser = (data) =>
  buildRequest(`/user/update`, {
    headers: { token: token },
  }).request({ method: 'POST', data: data });

// Authentication
export const login = (data) =>
  buildRequest('/auth/login', { method: 'POST' }).request({ data: data });

export const register = (data) =>
  buildRequest('/auth/register', { method: 'POST' }).request({ data: data });

// Order
export const checkout = (data) =>
  buildRequest(`/order/saveOrUpdate`, {
    method: 'POST',
    headers: { token: token },
  }).request({ data: data });

// ============= SaS Package calculate =======
