import clsx from 'clsx';

import { socialIcons } from '@/entities/social-icons';

import { ExternalLink } from './ExternalLink';

type SocialIconsTypes = { className?: string };

export const SocialIcons: React.FC<SocialIconsTypes> = ({ className }) => {
  return (
    <ul
      className={clsx(
        className,
        'py-3 w-full flex text-lg font-semibold leading-6 gap-6',
      )}
    >
      {socialIcons.map((link) => (
        <li key={link.id}>
          <ExternalLink href={link.href}>{link.icon}</ExternalLink>
        </li>
      ))}
    </ul>
  );
};
