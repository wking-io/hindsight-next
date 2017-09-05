import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Login from '../components/Login';
import withData from '../lib/withData';

const LoginPage = ({ url }) => (
  <App>
    <Header pathname={url.pathname} />
    <Login login={url.query.login === 'true' || false} />
  </App>
);

export default withData(LoginPage);
