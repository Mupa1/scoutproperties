import { forwardRef, TextareaHTMLAttributes } from 'react';

import { ErrorMessage } from './ErrorMessage';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, placeholder, error, ...props }, ref) => {
    return (
      <div>
        <div className="min-w-0 flex-1 w-full">
          <label htmlFor={id} className="sr-only">
            {placeholder}
          </label>
          <div className="ring-black/10 w-full placeholder:text-gray-400 overflow-hidden rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-primary-600">
            <textarea
              placeholder={placeholder}
              rows={4}
              defaultValue={''}
              ref={ref}
              className={
                'block w-full resize-none border-0 rounded-md p-2 sm:p-3 shadow-sm ring-1 ring-inset focus:outline-none ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6'
              }
              {...props}
            />
          </div>
        </div>
        {error && <ErrorMessage error={error} id={id} />}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
