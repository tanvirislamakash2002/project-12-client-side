import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/Logo/logoH.png'

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="h-12 w-auto object-contain"
      />
    </Link>
  );
};

export default Logo;