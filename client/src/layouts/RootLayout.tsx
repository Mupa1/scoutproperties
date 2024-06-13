import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

const RootLayout: FC = () => {
  return (
    <div className="mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
