import { forwardRef, LegacyRef } from 'react';
import { clsx } from 'clsx';

import { ErrorMessage } from './ErrorMessage';

export interface SelectOption {
  id: string | number;
  name: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | undefined;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, className, error, ...props },
    ref: LegacyRef<HTMLSelectElement> | undefined,
  ) => {
    return (
      <>
        <div className="flex flex-col">
          <label htmlFor={props.id}>{label}</label>
          <select
            id={props.id}
            ref={ref}
            className={clsx(
              'border-0 bg-white py-[10.5px] md:py-[12.5px] px-3.5 rounded-md shadow-sm ring-1 ring-inset focus:outline-none ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6',
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          {error ? <ErrorMessage error={error} id={props.id} /> : null}
        </div>
      </>
    );
  },
);

Select.displayName = 'Select';

export { Select };
