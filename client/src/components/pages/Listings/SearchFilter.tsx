import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

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

const SearchFilter = () => {
  const [search, setSearch] = useState({
    type: 'Buy',
    location: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const newValue = numericValue >= 0 ? numericValue : 0;
    setSearch((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted', search);
  };

  return (
    <form
      role="form"
      data-testid="search-filter-form"
      className="w-full sm:flex z-50 my-5"
      onSubmit={handleSubmit}
    >
      <Input
        data-testid="search-filter-location"
        className="flex-1 w-full"
        type="text"
        name="location"
        placeholder="City"
        onChange={handleChange}
      />
      <Select className="flex-1" options={typesOptions} id="types" />
      <Select className="flex-1" options={propertyOptions} id="property" />
      <Input
        data-testid="search-filter-minPrice"
        className="flex-1 w-full"
        type="number"
        name="minPrice"
        min={0}
        max={10000000}
        placeholder="Min Price"
        onChange={handleChange}
      />
      <Input
        data-testid="search-filter-maxPrice"
        className="flex-1 w-full"
        type="number"
        name="maxPrice"
        min={0}
        max={10000000}
        placeholder="Max Price"
        onChange={handleChange}
      />
      <Input
        data-testid="search-filter-bedrooms"
        className="flex-1 w-full"
        type="number"
        name="bedrooms"
        min={0}
        max={5}
        placeholder="Bedroom(s)"
        onChange={handleChange}
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

export default SearchFilter;
