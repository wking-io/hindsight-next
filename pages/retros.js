import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import Header from '../components/Header';
import NotAuthorized from '../components/NotAuthorized';
import RetroList from '../components/RetroList';
import withData from '../lib/withData';
import withUser from '../lib/withUser';

const RetrosPage = ({ url, isUser }) => (
  <App>
    <Header pathname={url.pathname} isUser={isUser} />
    {isUser ? <RetroList /> : <NotAuthorized />}
  </App>
);

RetrosPage.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isUser: PropTypes.string.isRequired,
};

export default withData(withUser(RetrosPage));
