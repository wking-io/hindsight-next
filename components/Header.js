import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Logo from './Logo';

const Header = ({ pathname, isUser }) =>
  isUser && (
    <header>
      <Link prefetch href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Link prefetch href="/">
        <a className={pathname === '/' && 'is-active'}>Dashboard</a>
      </Link>
      <Link prefetch href="/retros">
        <a className={pathname === '/retros' && 'is-active'}>Retros</a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  isUser: PropTypes.string.isRequired,
};

export default Header;
