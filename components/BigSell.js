import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const BigSell = () => (
  <div>
    <Logo />
    <p>A tool to facilitate your team having open discussions around improving your process</p>
    <Link prefetch href={{ pathname: '/login', query: { login: true } }}>
      <a className="btn">Login</a>
    </Link>
    <Link prefetch href={{ pathname: '/login', query: { login: false } }}>
      <a className="btn btn--outline">Signup</a>
    </Link>
  </div>
);

export default BigSell;
