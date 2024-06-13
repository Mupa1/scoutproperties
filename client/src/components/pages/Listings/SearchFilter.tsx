import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type SearchFormData = {
  type: string;
  property: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
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

export const SearchFilter = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: 'Buy or Rent',
      property: 'All Properties',
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    console.log('Form submitted', data);
  };

  return (
    <form
      role="form"
      data-testid="search-filter-form"
      className="w-full sm:flex z-50 my-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        data-testid="search-filter-location"
        className="flex-1 w-full"
        type="text"
        placeholder="City"
        {...register('location')}
      />
      <Select
        className="flex-1"
        options={typesOptions}
        id="types"
        {...register('type')}
      />
      <Select
        className="flex-1"
        options={propertyOptions}
        id="property"
        {...register('property')}
      />
      <Input
        data-testid="search-filter-minPrice"
        className="flex-1 w-full"
        type="number"
        min={0}
        max={10000000}
        placeholder="Min Price"
        {...register('minPrice', { valueAsNumber: true })}
      />
      <Input
        data-testid="search-filter-maxPrice"
        className="flex-1 w-full"
        type="number"
        min={0}
        max={10000000}
        placeholder="Max Price"
        {...register('maxPrice', { valueAsNumber: true })}
      />
      <Input
        data-testid="search-filter-bedrooms"
        className="flex-1 w-full"
        type="number"
        min={0}
        max={5}
        placeholder="Bedroom(s)"
        {...register('bedrooms', { valueAsNumber: true })}
      />
      <Button
        className="w-full sm:w-auto"
        data-testid="search-filter-submit-button"
        variant="primary"
        type="submit"
      >
        <IoSearch />
      </Button>
    </form>
  );
};
