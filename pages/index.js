import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import Header from '../components/Header';
import BigSell from '../components/BigSell';
import Dashboard from '../components/Dashboard';
import withData from '../lib/withData';
import withUser from '../lib/withUser';

const IndexPage = ({ url, isUser, logout }) => (
  <App>
    <Header pathname={url.pathname} isUser={isUser} logout={logout} />
    {isUser ? <Dashboard /> : <BigSell />}
  </App>
);

IndexPage.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isUser: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withData(withUser(IndexPage));
