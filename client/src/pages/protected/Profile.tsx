import { FC } from 'react';

import { PersonalInfo } from '@/components/pages/Profile/PersonalInfo';
import { PersonalListings } from '@/components/pages/Profile/PersonalListings';
import { useUserContext } from '@/context/useUserContext';
import { listingsData } from '@/lib/dummy-data';

export const Profile: FC = () => {
  const { currentUser } = useUserContext();

  const company = currentUser?.company;
  const name = currentUser?.name;
  const email = currentUser?.email;
  const avatar = currentUser?.avatar || '/user-placeholder.svg';

  return (
    <section className="min-h-screen mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-3">
        <PersonalInfo
          avatar={avatar}
          name={name}
          company={company}
          email={email}
        />
        <hr />
        <PersonalListings listingsData={listingsData} />
      </div>
    </section>
  );
};
