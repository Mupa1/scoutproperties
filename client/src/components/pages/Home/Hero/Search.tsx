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
      className="max-w-2xl w-full m-auto flex flex-col items-center mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex mb-5 bg-white/95 backdrop-blur-md rounded-xl p-1 border border-white/30 shadow-xl gap-1">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleSwitchType(type)}
            className={`
              flex-1 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
              ${
                type === selectedType
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 bg-transparent'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex w-full max-w-lg gap-2 bg-white/95 backdrop-blur-md rounded-xl p-2 border border-white/30 shadow-xl items-center">
        <div className="flex-1 min-w-0 [&>div:first-child]:mb-0 [&>div:last-child]:hidden">
          <Input
            data-testid="city"
            className="w-full border-0 bg-transparent focus:ring-0 text-gray-900 placeholder:text-gray-500"
            type="text"
            placeholder="Enter city name..."
            {...register('city')}
          />
        </div>
        <input type="hidden" {...register('type')} />
        <Button
          data-testid="search-submit-button"
          variant="primary"
          type="submit"
          className="flex-shrink-0 px-6 h-[2.75rem]"
        >
          <IoSearch size={20} />
        </Button>
      </div>
    </form>
  );
};
