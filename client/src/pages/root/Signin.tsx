import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Button,
  ErrorMessage,
  failureToast,
  Input,
  Loader,
  successToast,
} from '@/components/ui';
import { useUserContext } from '@/context/useUserContext';
import { useSignin } from '@/lib/react-query/mutations';
import { SigninValidation } from '@/lib/validations';
import { AuthErrorType } from '@/types';

export const Signin = () => {
  const [signinError, setSigninError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: signinUser, isPending } = useSignin();

  const handleSignin = async (
    data: z.infer<typeof SigninValidation>,
  ) => {
    try {
      const response = await signinUser(data);
      if (response?.status === 200) {
        successToast(response.data.message);

        reset();
        updateUser(response.data);
        navigate('/');
      }
    } catch (err) {
      const error = err as AuthErrorType;

      if (error?.response?.data?.message) {
        failureToast(error.response.data.message);
        setSigninError(error.response.data.message);
      } else {
        setSigninError('An unknown error occurred');
      }
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-form-wrapper">
        <h2 className="auth-form-title">Log in to your account</h2>
        <div className="mt-10">
          <form onSubmit={handleSubmit(handleSignin)}>
            <Input
              label="Email"
              id="email"
              type="email"
              error={errors?.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              error={errors?.password?.message}
              {...register('password')}
            />

            <div>
              <Button type="submit" className="w-full mt-3" variant="primary">
                {isPending ? <Loader /> : 'Sign In'}
              </Button>
            </div>
            <div className="text-center">
              <ErrorMessage error={signinError} />
            </div>
          </form>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/sign-up"
            className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};
