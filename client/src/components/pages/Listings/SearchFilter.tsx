import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoFilter, IoSearch } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SearchFormData } from '@/types';

type SearchFilterProps = {
  onSubmit: (data: SearchFormData) => void;
};

const typesOptions = [
  { id: 1, name: 'Buy or Rent' },
  { id: 2, name: 'Rent' },
  { id: 3, name: 'Buy' },
];

const propertyOptions = [
  { id: 1, name: 'All Properties' },
  { id: 2, name: 'Apartment' },
  { id: 3, name: 'House' },
  { id: 4, name: 'Condo' },
  { id: 5, name: 'Land' },
];

export const SearchFilter: FC<SearchFilterProps> = ({ onSubmit }) => {
  const [showFilters, setShowFilters] = useState(false);

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      type: 'Buy or Rent',
      property: 'All Properties',
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
    },
  });

  const handleFilterButtonClick = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className="absolute">
      <Button
        variant="neutral"
        onClick={handleFilterButtonClick}
        className="md:hidden flex-1 border-0 -mt-6 px-0"
      >
        {showFilters ? (
          <IoCloseSharp size={20} title="Hide Filters" />
        ) : (
          <>
            <IoFilter size={18} title="Show Filters" />
            Filters
          </>
        )}
      </Button>

      <form
        role="form"
        data-testid="search-filter-form"
        className={`text-sm ${showFilters ? 'block p-2 border rounded-md' : 'hidden'} relative md:sticky w-full grid md:flex items-start md:items-end gap-3 z-50 bg-white`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 md:flex gap-2">
          <Input
            data-testid="search-filter-location"
            className="w-full md:w-48"
            type="text"
            label="City"
            placeholder="City"
            {...register('location')}
          />
          <Select
            data-testid="search-filter-type"
            className="md:w-30"
            options={typesOptions}
            label="Types"
            {...register('type')}
          />
          <Select
            data-testid="search-filter-property"
            className="md:w-30"
            options={propertyOptions}
            label="Property"
            {...register('property')}
          />
          <Input
            data-testid="search-filter-minPrice"
            className="md:w-30"
            type="number"
            min={0}
            max={10000000}
            label="Min Price"
            {...register('minPrice', { valueAsNumber: true })}
          />
          <Input
            data-testid="search-filter-maxPrice"
            className="md:w-30"
            type="number"
            min={0}
            max={10000000}
            label="Max Price"
            {...register('maxPrice', { valueAsNumber: true })}
          />
          <Input
            data-testid="search-filter-bedrooms"
            className="md:w-30"
            type="number"
            min={0}
            max={5}
            label="Bedroom(s)"
            {...register('bedrooms', { valueAsNumber: true })}
          />
        </div>
        <Button
          className="w-full sm:w-auto h-[2.75rem]"
          data-testid="search-filter-submit-button"
          variant="primary"
          type="submit"
        >
          <IoSearch />
        </Button>
      </form>
    </div>
  );
};
