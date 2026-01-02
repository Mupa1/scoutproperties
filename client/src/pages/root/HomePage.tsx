import { FC } from 'react';

import { CategoriesLinks } from '@/components/pages/Home/CategoriesLinks';
import { Hero } from '@/components/pages/Home/Hero/Hero';

export const HomePage: FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-white">
      <Hero />
      <CategoriesLinks />
    </section>
  );
};
