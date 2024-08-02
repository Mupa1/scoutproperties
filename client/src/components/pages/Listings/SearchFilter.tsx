import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoFilter, IoSearch } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SearchFormData } from '@/types';

type SearchFilterProps = {
  onSubmit: (data: SearchFormData) => void;
  initialValues?: Partial<SearchFormData>;
};

const typesOptions = [
  { id: 'Rent', name: 'Rent' },
  { id: 'Buy', name: 'Buy' },
];

const propertyOptions = [
  { id: 'Apartment', name: 'Apartment' },
  { id: 'House', name: 'House' },
  { id: 'Condo', name: 'Condo' },
  { id: 'Land', name: 'Land' },
];

export const SearchFilter: FC<SearchFilterProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const { register, handleSubmit, setValue } = useForm<SearchFormData>({
    defaultValues: {
      type: 'Buy',
      property: 'Apartment',
      city: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedroom: 1,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof SearchFormData, value);
      });
    }
  }, [initialValues, setValue]);

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
        <div className="grid gap-2 grid-cols-2 md:flex">
          <div>
            <Input
              data-testid="search-filter-city"
              className=""
              type="text"
              label="City"
              placeholder="City"
              {...register('city')}
            />
          </div>
          <div>
            <Select
              data-testid="search-filter-type"
              className="md:w-30"
              options={typesOptions}
              label="Types"
              {...register('type')}
            />
          </div>
          <div>
            <Select
              data-testid="search-filter-property"
              className="md:w-30"
              options={propertyOptions}
              label="Property"
              {...register('property')}
            />
          </div>
          <div>
            <Input
              data-testid="search-filter-minPrice"
              className="md:w-30"
              type="number"
              min={0}
              max={10000000}
              label="Min Price"
              {...register('minPrice', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Input
              data-testid="search-filter-maxPrice"
              className="md:w-30"
              type="number"
              min={0}
              max={10000000}
              label="Max Price"
              {...register('maxPrice', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Input
              data-testid="search-filter-bedroom"
              className="md:w-30"
              type="number"
              min={0}
              max={5}
              label="Bedroom(s)"
              {...register('bedroom', { valueAsNumber: true })}
            />
          </div>
        </div>
        <Button
          className="w-full sm:w-auto h-[2.75rem] mb-2"
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
