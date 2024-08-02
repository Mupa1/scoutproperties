import { FC } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type ProfileInfoProps = {
  avatar?: string;
  name?: string;
  company?: string;
  email?: string;
};

export const ProfileInfo: FC<ProfileInfoProps> = ({
  avatar,
  name,
  company,
  email,
}) => {
  return (
    <div className="pb-6">
      <div className="flex-between my-4">
        <h2 className="font-semibold">Personal Information</h2>
        <Link to="/profile/update" className="link">
          <FaRegEdit size={18} />
          Edit Profile
        </Link>
      </div>

      <img src={avatar} alt="profile" className="h-24 w-24 rounded-full" />
      <dl className="grid gap-6 pt-6">
        <Info label="Full name" value={name} />
        <Info label="company" value={company} />
        <Info label="Email address" value={email} />
      </dl>
    </div>
  );
};

type InfoProps = {
  label: string;
  value?: string;
};

const Info: FC<InfoProps> = ({ label, value }) => (
  <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6">{label}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);
