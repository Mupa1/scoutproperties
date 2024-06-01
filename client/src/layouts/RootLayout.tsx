import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/shared/Header';

const RootLayout: FC = () => {
  return (
    <main className="layout">
      <Header />
      <Outlet />
    </main>
  );
};

export default RootLayout;
