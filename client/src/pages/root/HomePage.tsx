import { CategoriesLinks } from '@/components/pages/Home/CategoriesLinks';
import { Hero } from '@/components/pages/Home/Hero/Hero';

export const HomePage = () => {
  return (
    <div className="relative w-100 h-full">
      <Hero />
      <CategoriesLinks />
    </div>
  );
};
