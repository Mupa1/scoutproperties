import { useEffect, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { RiMenuFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { motion } from 'framer-motion';

import { navItems } from '@/entities/nav-items';

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';
  const isListings = location.pathname === '/listings';
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        setShowHeader(currentScrollY <= lastScrollY);
        setLastScrollY(currentScrollY);
        setIsScrolled(currentScrollY > 0);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`header fixed inset-x-0 top-0 z-50 py-2 ${isHomePage && !isScrolled ? 'text-white' : 'bg-gray-50'} ${isScrolled && isHomePage && 'bg-gray-50 text-gray-700'}`}
    >
      <nav
        className={`flex-between mx-auto ${isListings ? '' : 'max-w-7xl'} px-6 py-2 lg:px-8`}
        aria-label="Global"
      >
        <div className="lg:flex-1">
          <Link to="/">
            <span className="sr-only">Scout properties logo</span>
            <img
              className="h-10 w-auto"
              src="/scout-logo.svg"
              alt="scout properties logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="flex-center rounded-md"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenuFill className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="#" className="text-sm font-semibold leading-6">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-50 px-6 py-4 sm:max-w-sm">
          <div className="flex-between">
            <Link to="#">
              <span className="sr-only">Scout properties logo</span>
              <img
                className="h-10 w-auto"
                src="/scout-logo.svg"
                alt="scout properties logo"
              />
            </Link>
            <button
              type="button"
              className="rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <HiMiniXMark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="sm-nav-links"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="#"
                  className="sm-nav-links"
                  onClick={handleLinkClick}
                  tabIndex={0}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};
