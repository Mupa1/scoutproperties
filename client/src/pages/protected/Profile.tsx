import { FC } from 'react';

import { ListingCard } from '@/components/pages/Listings/ListingCard';
import { useUserContext } from '@/context/useUserContext';
import { listingsData } from '@/lib/dummy-data';

export const Profile: FC = () => {
  const { currentUser } = useUserContext();

  const username = currentUser?.username;
  const name = currentUser?.name;
  const email = currentUser?.email;
  const avatar = currentUser?.avatar || '/user-placeholder.svg';

  return (
    <section className="min-h-screen mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-3">
        <>
          <h2 className="font-bold mt-4">Personal Information</h2>
          <div className="flex flex-wrap gap-3">
            <img
              src={avatar}
              alt="profile"
              className="h-24 w-24 rounded-full"
            />
            <div className="lg:flex gap-4 flex-col hidden">
              <p className="text-gray-500 leading-4">{username}</p>
              <p className="leading-4">{name}</p>
              <p className="text-gray-500 leading-4 mb-3">{email}</p>
            </div>
          </div>
        </>
        <>
          <h2 className="font-bold mt-4">My Listings</h2>
          <div className="h-max grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {listingsData.map((item) => (
              <div key={item.id}>
                <ListingCard data={item} />
              </div>
            ))}
          </div>
        </>
      </div>
    </section>
  );
};
