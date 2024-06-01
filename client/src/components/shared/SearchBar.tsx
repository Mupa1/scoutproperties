import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const types = ['Buy', 'Rent'] as const;
type SearchType = (typeof types)[number];

const SearchBar = () => {
  const [search, setSearch] = useState({
    type: 'Buy',
    location: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const handleSwitchType = (value: SearchType) => {
    setSearch((prev) => ({ ...prev, type: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const newValue = numericValue >= 0 ? numericValue : 0;
    setSearch((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <>
      <div className="flex">
        {types.map((type) => (
          <Button
            className="w-20 border-b-0 first:border-r-0 last:border-l-0"
            key={type}
            variant={search.type === type ? 'secondary' : 'neutral'}
            onClick={() => handleSwitchType(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <form className="flex">
        <Input
          data-testid="location"
          className="w-28 flex-1"
          type="text"
          name="location"
          placeholder="City"
          onChange={handleChange}
        />
        <Input
          data-testid="input-minPrice"
          className="flex-1"
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <Input
          data-testid="input-maxPrice"
          className="flex-1"
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Button
          data-testid="search-submit-button"
          variant="primary"
          type="submit"
        >
          <IoSearch />
        </Button>
      </form>
    </>
  );
};

export default SearchBar;
