import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../assets/Logo/logoV.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">
        {/* Logo Section */}
        <div>
          <img src={logo} alt="Logo" className="h-24 w-auto object-contain mb-4" />
          <p className="text-sm">
            A community-driven platform reducing food waste and supporting those in need.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="footer-title mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/about-us" className="link link-hover">About Us</Link></li>
            <li><Link to="/contact-us" className="link link-hover">Contact</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="footer-title mb-3">Support</h4>
          <ul className="space-y-2">
            <li><span className="link link-hover">FAQ</span></li>
            <li><span className="link link-hover">Privacy Policy</span></li>
            <li><span className="link link-hover">Terms & Conditions</span></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="footer-title mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-base-300 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} — All rights reserved by{' '}
            <span className="font-semibold">Local Food Waste Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
