import React from 'react';
import WelcomeLinks from './WelcomeLinks';

const NotAuthorized = () => (
  <div>
    <p>Sorry, looks like you are not logged in. Please log in or if you are a new user sign up.</p>
    <WelcomeLinks />
  </div>
);

export default NotAuthorized;
