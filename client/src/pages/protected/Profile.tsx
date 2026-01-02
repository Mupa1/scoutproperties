import { FC } from 'react';

import { ProfileInfo } from '@/components/pages/Profile/ProfileInfo';
import { ProfileListings } from '@/components/pages/Profile/ProfileListings';
import { useUserContext } from '@/context/useUserContext';
import { useProfileListings } from '@/lib/react-query/queries';

export const Profile: FC = () => {
  const { currentUser } = useUserContext();
  const {
    data: listingsData,
    isPending,
    isError,
  } = useProfileListings(!!currentUser);

  const company = currentUser?.company;
  const name = currentUser?.name;
  const email = currentUser?.email;
  const avatar = currentUser?.avatar || '/user-placeholder.svg';

  return (
    <section className="min-h-screen mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-3">
        <ProfileInfo
          avatar={avatar}
          name={name}
          company={company}
          email={email}
        />
        <hr />
        <ProfileListings
          listingsData={listingsData}
          isLoading={isPending}
          isError={isError}
        />
      </div>
    </section>
  );
};
