import { Link } from 'react-router-dom';

import { navItems } from '@/entities/nav-items';

import { SocialIcons } from './SocialIcons';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="sr-only">Scout properties logo</span>
              <img
                className="h-10 w-auto"
                src="/scout-logo.svg"
                alt="scout properties logo"
              />
            </Link>
            <p className="text-sm leading-6 text-gray-600 max-w-md">
              Cras consequat dignissim bibendum. Donec nec tempor sem. Duis
              vestibulum congue pharetra. Maecenas pellentesque elementum urna, eu
              rutrum leo luctus a. Cras vel turpis sed velit ornare tristique.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Follow us on social media for the latest updates and property listings.
            </p>
            <SocialIcons className="flex items-center gap-4" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Scoutproperties. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link
                to="/about"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
