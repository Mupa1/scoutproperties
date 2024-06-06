import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/shared/Header';

const RootLayout: FC = () => {
  return (
    <div className="h-screen flex flex-col max-w-7xl mx-auto">
      <Header />
      <div className="flex flex-1 overflow-hidden px-6 lg:px-8 ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
