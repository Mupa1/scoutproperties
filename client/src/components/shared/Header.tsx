import { useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { RiMenuFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';

import { headerNavItems } from '@/entities/header-nav-items';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white">
      <nav
        className="flex-between mx-auto max-w-7xl px-6 py-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/">
            <span className="sr-only">Scout properties logo</span>
            <img
              className="h-10 w-auto"
              src="/logoBig.svg"
              alt="scout properties logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="flex-center rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenuFill className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {headerNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="stick inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex-between">
            <Link to="#">
              <span className="sr-only">Scout properties logo</span>
              <img
                className="h-10 w-auto"
                src="/logoBig.svg"
                alt="scout properties logo"
              />
            </Link>
            <button
              type="button"
              className="rounded-md text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <HiMiniXMark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-2">
                {headerNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="sm-header-links"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link to="#" className="sm-header-links">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
