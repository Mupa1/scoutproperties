import { FaGithub } from 'react-icons/fa';
import { FaLinkedinIn, FaSquareXTwitter } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export const socialIcons = [
  {
    id: 'github',
    icon: <FaGithub title="Github" />,
    href: 'https://github.com/Mupa1',
  },
  {
    id: 'linkedin',
    icon: <FaLinkedinIn title="LinkedIn" />,
    href: 'https://www.linkedin.com/in/mupa-nzaphila',
  },
  {
    id: 'twitter',
    icon: <FaSquareXTwitter title="Twitter" />,
    href: 'https://twitter.com/mupa_mmbetsa',
  },
  {
    id: 'gmail',
    icon: <SiGmail title="GMail" />,
    href: 'mailto:mupasmail@gmail.com',
  },
];
