import { FC } from 'react';

import { CategoriesLinks } from '@/components/pages/Home/CategoriesLinks';
import { Hero } from '@/components/pages/Home/Hero/Hero';

export const HomePage: FC = () => {
  return (
    <section className="relative w-100 h-full">
      <Hero />
      <CategoriesLinks />
    </section>
  );
};
