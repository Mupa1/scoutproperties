import { forwardRef, LegacyRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type, placeholder, className, ...props },
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <>
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <input
          ref={ref}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={id}
          className={clsx(
            'border-0 py-2.5 px-3 rounded-sm shadow-sm ring-1 ring-inset focus:outline-none ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6',
            className,
          )}
          {...props}
        />
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input };
