import { Fragment, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { IoLogOut } from 'react-icons/io5';
import { PiSignInBold } from 'react-icons/pi';
import { RiMenuFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
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

  const user = JSON.parse(localStorage.getItem('user')) || null;
  console.log('user', user);

  const { username, email } = user.data;
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
          <Link
            to="/sign-in"
            className="text-sm font-semibold leading-6 flex-center gap-2"
          >
            Sign in
            <span aria-hidden="true">
              <PiSignInBold size={20} />
            </span>
          </Link>
        </div>
        <Menu as="div" className="relative inline-block ml-auto">
          <div>
            <MenuButton className="flex gap-3 text-left items-center rounded-full focus:outline-none">
              <span className="sr-only">Open menu</span>
              <img
                src={user.imageUrl || '/images/user-placeholder.svg'}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="lg:flex flex-col hidden">
                <p>{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.username}</p>
              </div>
            </MenuButton>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md border border-white/5 bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {() => (
                    <Link
                      to={`/profile/${user.id}`}
                      className={`flex gap-x-3 items-center px-4 py-2 text-sm`}
                    >
                      <FaUser className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {() => (
                    <button
                      type="button"
                      className={`flex gap-x-3 items-center w-full px-4 py-2 text-left text-sm`}
                      // onClick={(e) => handleSignOut(e)}
                    >
                      <IoLogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
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
              <div className="py-2">
                <Link to="/sign-in" className="sm-nav-links gap-2 items-center">
                  Sign in
                  <span aria-hidden="true">
                    <PiSignInBold size={20} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};
