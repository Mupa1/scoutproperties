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
import { useSignup } from '@/lib/react-query/mutations';
import { SignupValidation } from '@/lib/validations';
import { AuthErrorType } from '@/types';

export const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();
    const { updateUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const { mutateAsync: signupUser, isPending } = useSignup();

  const handleSignup = async (
    data: z.infer<typeof SignupValidation>,
  ) => {
    try {
      const response = await signupUser(data);
      if (response?.status === 201) {
        successToast(response.data.message);

        reset();
        updateUser(response.data);
        navigate('/sign-in');
      }
    } catch (err) {
      const error = err as AuthErrorType;
      if (error?.response?.data?.message) {
        failureToast(error.response.data.message);
        setSignupError(error.response.data.message);
      } else {
        failureToast('An unknown error occurred');
        setSignupError('An unknown error occurred');
      }
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-form-wrapper">
        <h2 className="auth-form-title">Register a new account</h2>
        <div className="mt-10">
          <form onSubmit={handleSubmit(handleSignup)}>
            <Input
              label="Name"
              id="name"
              type="text"
              error={errors?.name?.message}
              {...register('name')}
            />
            <Input
              label="Username"
              id="username"
              type="text"
              error={errors?.username?.message}
              {...register('username')}
            />
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
                {isPending ? <Loader /> : 'Sign Up'}
              </Button>
            </div>
            <div className="text-center">
              <ErrorMessage error={signupError} />
            </div>
          </form>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};
