import React from 'react';

import ProfileLayout from './ProfileLayout';
import Wishlist from './Wishlist';
import MyAccount from './MyAccount';
import Order from './Order';

const Profile = (props) => {
  const { slug } = props;

  return (
    <ProfileLayout path={slug}>
      {slug === 'wishlist' && <Wishlist />}

      {['my-account', ''].includes(slug) && <MyAccount />}

      {slug === 'orders' && <Order />}
    </ProfileLayout>
  );
};

export default Profile;
