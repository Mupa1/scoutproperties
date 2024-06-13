import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';

export const NoMatch = () => {
  const navigate = useNavigate();

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <section className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex-center gap-x-6">
          <Button
            type="button"
            className="w-36"
            variant="inverted"
            onClick={handleBackClick}
          >
            &larr; Go back
          </Button>
          <Link
            to="/"
            className="flex-center gap-2 w-36 font-normal border-2 border-primary-500 bg-primary-500 px-3.5 py-2.5 text-white shadow-sm"
          >
            Homepage <FaHome />
          </Link>
        </div>
      </div>
    </section>
  );
};
