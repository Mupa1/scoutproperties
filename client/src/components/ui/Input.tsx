import { forwardRef, LegacyRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type, label, className, ...props },
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          name={id}
          type={type}
          autoComplete={id}
          placeholder={label}
          className={clsx(
            'border-0 bg-white py-2.5 px-3 rounded-md shadow-sm ring-1 ring-inset focus:outline-none ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
