import { ButtonHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'neutral' | 'inverted';
}

const button = tv({
  base: 'flex-center rounded-md gap-2 px-3.5 py-2.5 leading-6 font-normal shadow-sm hover-transition',
  variants: {
    color: {
      primary: 'bg-primary-500 text-white ',
      secondary: 'bg-primary-950 text-white',
      neutral: 'border-2 border-black',
      inverted: 'bg-white border-2 border-primary-500',
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
