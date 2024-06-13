import { Link } from 'react-router-dom';

import { propertiesCategories } from '@/entities/properties-categories';

export const CategoriesLinks = () => {
  return (
    <section className="min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore homes on Scoutproperties
          </h2>
          <p className="mt-4 text-lg leading-8">
            Fusce auctor justo eu tortor pulvinar, quis rhoncus tortor ornare.
            Mauris sodales justo id sapien blandit, sit amet venenatis urna
            pellentesque. Pellentesque et turpis nulla.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {propertiesCategories.map((properties) => (
            <li
              key={properties.title}
              className="grid grid-cols content-between rounded-2xl shadow-xl border border-gray-100 px-8 py-10"
            >
              <img
                className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
                src={properties.imageUrl}
                alt=""
              />
              <p className="text-sm leading-6">{properties.description}</p>
              <Link
                to={properties.link}
                className="flex-center m-auto gap-2 w-36 font-normal border-2 border-primary-500 mt-4 px-3.5 py-2.5 shadow-sm"
              >
                {properties.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
