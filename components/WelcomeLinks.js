import React from 'react';
import Link from 'next/link';

const WelcomeLinks = () => (
  <div>
    <Link prefetch href={{ pathname: '/login', query: { login: true } }}>
      <a className="btn">Login</a>
    </Link>
    <Link prefetch href={{ pathname: '/login', query: { login: false } }}>
      <a className="btn btn--outline">Signup</a>
    </Link>
  </div>
);

export default WelcomeLinks;
