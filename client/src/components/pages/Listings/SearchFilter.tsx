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
  { id: '', name: 'All Types' },
  { id: 'Rent', name: 'Rent' },
  { id: 'Buy', name: 'Buy' },
];

const propertyOptions = [
  { id: '', name: 'All Properties' },
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
  const { register, handleSubmit, setValue, reset } = useForm<SearchFormData>({
    defaultValues: {
      type: '',
      property: '',
      city: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedroom: 0,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof SearchFormData, value);
      });
    } else {
      reset({
        type: '',
        property: '',
        city: '',
        minPrice: 0,
        maxPrice: 10000000,
        bedroom: 0,
      });
    }
  }, [initialValues, setValue, reset]);

  const handleFilterButtonClick = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Button
        variant="neutral"
        onClick={handleFilterButtonClick}
        className="md:hidden w-full mb-3 flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50"
      >
        {showFilters ? (
          <>
            <IoCloseSharp size={18} />
            Hide Filters
          </>
        ) : (
          <>
            <IoFilter size={18} />
            Show Filters
          </>
        )}
      </Button>

      <form
        role="form"
        data-testid="search-filter-form"
        className={`text-sm ${showFilters ? 'block' : 'hidden'} md:block w-full`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[120px] max-w-[200px]">
            <Input
              data-testid="search-filter-city"
              type="text"
              label="City"
              placeholder="Any city"
              {...register('city')}
            />
          </div>
          <div className="flex-1 min-w-[120px] max-w-[150px]">
            <Select
              data-testid="search-filter-type"
              options={typesOptions}
              label="Type"
              {...register('type')}
            />
          </div>
          <div className="flex-1 min-w-[140px] max-w-[180px]">
            <Select
              data-testid="search-filter-property"
              options={propertyOptions}
              label="Property"
              {...register('property')}
            />
          </div>
          <div className="flex-1 min-w-[120px] max-w-[150px]">
            <Input
              data-testid="search-filter-minPrice"
              type="number"
              min={0}
              max={10000000}
              label="Min Price"
              placeholder="0"
              {...register('minPrice', { valueAsNumber: true })}
            />
          </div>
          <div className="flex-1 min-w-[120px] max-w-[150px]">
            <Input
              data-testid="search-filter-maxPrice"
              type="number"
              min={0}
              max={10000000}
              label="Max Price"
              placeholder="Max"
              {...register('maxPrice', { valueAsNumber: true })}
            />
          </div>
          <div className="flex-1 min-w-[100px] max-w-[130px]">
            <Input
              data-testid="search-filter-bedroom"
              type="number"
              min={0}
              max={5}
              label="Bedrooms"
              placeholder="Any"
              {...register('bedroom', { valueAsNumber: true })}
            />
          </div>
          <div className="flex-shrink-0 flex flex-col">
            <label className="opacity-0 pointer-events-none select-none">
              Search
            </label>
            <Button
              className="px-4 h-[2.75rem]"
              data-testid="search-filter-submit-button"
              variant="primary"
              type="submit"
            >
              <IoSearch className="mr-1.5" size={18} />
              Search
            </Button>
            <div className="mb-2"></div>
          </div>
        </div>
      </form>
    </div>
  );
};
