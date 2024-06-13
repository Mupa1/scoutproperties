import { Link } from 'react-router-dom';

import { navItems } from '@/entities/header-nav-items';

import { ExternalLink } from './ExternalLink';
import { SocialIcons } from './SocialIcons';

export const Footer = () => {
  return (
    <footer className="text-center m-auto bg-gray-50 text-gray-600 py-4 mt-4">
      <div className="m-auto text-center max-w-4xl px-6 py-2 lg:px-8">
        <div className="grid gap-3">
          <div className="flex-center">
            <Link to="/">
              <span className="sr-only">Scout properties logo</span>
              <img
                className="h-10 w-auto grayscale"
                src="scout-logo.svg"
                alt="scout properties logo"
              />
            </Link>
          </div>
          <p>
            Cras consequat dignissim bibendum. Donec nec tempor sem. Duis
            vestibulum congue pharetra. Maecenas pellentesque elementum urna, eu
            rutrum leo luctus a. Cras vel turpis sed velit ornare tristique.
          </p>
          <div>
            <div>
              <h5>Useful Links:</h5>
              <div className="grid grid-cols-3 gap-3 pt-2 pb-3 max-w-72 m-auto">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.href} className="block">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="pb-2">Contacts:</h5>

              <ExternalLink href="mailto:mupasmail@gmail.com">
                mupasmail@gmail.com
              </ExternalLink>

              <SocialIcons className="flex-center" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 mt-2">
          <i>
            Scoutproperties Copyright {new Date().getFullYear()}. All Rights
            Reserved.
          </i>
        </div>
      </div>
    </footer>
  );
};
