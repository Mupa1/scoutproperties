import { Link } from 'react-router-dom';

import { propertiesCategories } from '@/entities/properties-categories';

export const CategoriesLinks = () => {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Explore Property Types
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Browse through our curated collection of properties. Whether you're
            looking to rent or buy, we have options for every lifestyle.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {propertiesCategories.map((properties) => (
            <li
              key={properties.title}
              className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="flex-1 p-8 text-center">
                <div className="mx-auto mb-6 h-32 w-32 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-200">
                  <img
                    className="h-full w-full object-cover"
                    src={properties.imageUrl}
                    alt={properties.title}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {properties.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-6">
                  {properties.description}
                </p>
                <Link
                  to={properties.link}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  Explore {properties.title}
                  <span className="text-primary-600">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
