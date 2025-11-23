import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';

import HeaderClient from 'components/HeaderClient';
import FooterClient from 'components/FooterClient';
import Routes from 'components/Routes';
import './App.less';

const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            color: 'var(--primary)',
          }}
        />
      }
    >
      <Layout className="layout-container">
        <Header className="header-container">
          <HeaderClient />
        </Header>
        <Content className="content-container">
          <Routes />
        </Content>
        <Footer className="footer-container" style={{ padding: 0 }}>
          <FooterClient />
        </Footer>
      </Layout>
    </Suspense>
  );
};

export default App;
