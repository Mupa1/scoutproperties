import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { useUserContext } from '@/context/useUserContext';

const RequireAuthLayout: FC = () => {
  const { currentUser } = useUserContext();

  return (
    <>
      {currentUser ? (
        <div className="mx-auto">
          <Header />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default RequireAuthLayout;
