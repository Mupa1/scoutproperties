import { Fragment, useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { PiSignInBold, PiSignOutBold } from 'react-icons/pi';
import { RiMenuFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
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

import { useUserContext } from '@/context/useUserContext';
import { navItems } from '@/entities/nav-items';
import { useSignout } from '@/lib/react-query/mutations';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, updateUser } = useUserContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { mutate: signOut } = useSignout();
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

  const handleSignOut = async () => {
    try {
      signOut();
      updateUser(null);
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const company = currentUser?.company;
  const name = currentUser?.name;
  const avatar = currentUser?.avatar || '/user-placeholder.svg';

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`header fixed inset-x-0 top-0 z-[60] py-2 ${isHomePage && !isScrolled ? 'text-white' : 'bg-gray-50'} ${isScrolled && isHomePage && 'bg-gray-50 text-gray-700'}`}
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
        {currentUser ? (
          <Menu
            as="div"
            className="relative hidden lg:flex lg:items-center lg:flex-1 lg:justify-end"
          >
            <>
              <MenuButton className="flex-center gap-3 text-left rounded-full focus:outline-none">
                <span className="sr-only">Open menu</span>
                <img
                  src={avatar}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
                <div className="lg:flex gap-0 flex-col hidden">
                  <p className="leading-4">{name}</p>
                  <p className="text-sm text-gray-400 leading-4">{company}</p>
                </div>
              </MenuButton>
            </>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-[60] mt-[8rem] w-32 rounded-md border border-white/5 text-gray-700 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className={`flex gap-x-3 items-center px-4 py-2 text-sm`}
                    >
                      <FaRegUser />
                      <span>My Profile</span>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className="flex gap-x-3 items-center w-full px-4 py-2 text-left text-sm hover-transition"
                      onClick={handleSignOut}
                    >
                      <PiSignOutBold />
                      <span>Sign out</span>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        ) : (
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
        )}
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
              {currentUser ? (
                <div className="divide-b mb-3 rounded-md">
                  <p>{name}</p>
                  <p className="text-sm text-gray-400">{company}</p>
                </div>
              ) : null}
              <div>
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
                {currentUser ? (
                  <>
                    <Link
                      to="/profile"
                      className="sm-nav-links gap-2 items-center"
                      onClick={handleLinkClick}
                    >
                      <span aria-hidden="true">
                        <FaRegUser />
                      </span>
                      My Profile
                    </Link>
                    <button
                      type="button"
                      className="sm-nav-links gap-2 items-center hover-transition"
                      onClick={handleSignOut}
                    >
                      <span aria-hidden="true">
                        <PiSignOutBold />
                      </span>
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/sign-in"
                    className="sm-nav-links gap-2 items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span aria-hidden="true">
                      <PiSignInBold size={20} />
                    </span>
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};
