import { ButtonHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'neutral';
}

const button = tv({
  base: 'flex-center gap-2 p-2 sm:p-3 leading-6 font-normal shadow-sm transition ease-in-out duration-[400ms] hover:scale-105',
  variants: {
    color: {
      primary: 'bg-primary-500 text-white ',
      secondary: 'bg-gray-600 text-white',
      neutral: 'border-2 border-black/10',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, type = 'button', variant, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={button({ className, color: variant })}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export { Button };
