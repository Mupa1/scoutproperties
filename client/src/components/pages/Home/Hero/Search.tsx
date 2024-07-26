import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const types = ['Buy', 'Rent'] as const;
type SearchType = (typeof types)[number];

type SearchData = {
  city: string;
  type: SearchType;
};

export const Search = () => {
  const { register, handleSubmit, setValue, watch } = useForm<SearchData>({
    defaultValues: {
      city: '',
      type: 'Rent',
    },
  });

  const navigate = useNavigate();
  const selectedType = watch('type');

  const onSubmit = (data: SearchData) => {
    const queryParams = new URLSearchParams({
      city: data.city,
      type: data.type,
    }).toString();
    navigate(`/listings?${queryParams}`);
  };

  const handleSwitchType = (value: SearchType) => {
    setValue('type', value);
  };

  return (
    <form
      role="form"
      className="max-w-80 m-auto flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-center mb-4">
        {types.map((type) => (
          <Button
            className="w-20 border-2 border-primary-950 text-primary-50 first:border-r-0 last:border-l-0"
            key={type}
            variant={type === selectedType ? 'secondary' : 'neutral'}
            onClick={() => handleSwitchType(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <div className="flex">
        <Input
          data-testid="city"
          className="w-56 flex-1"
          type="text"
          placeholder="City"
          {...register('city')}
        />
        <input type="hidden" {...register('type')} />
        <Button
          data-testid="search-submit-button"
          variant="primary"
          type="submit"
        >
          <IoSearch />
        </Button>
      </div>
    </form>
  );
};
