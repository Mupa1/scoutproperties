import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TiEdit } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import UploadWidget from '@/components/shared/UploadWidget';
import {
  Button,
  ErrorMessage,
  failureToast,
  Input,
  Loader,
  successToast,
} from '@/components/ui';
import { useUserContext } from '@/context/useUserContext';
import { useUpdateUser } from '@/lib/react-query/mutations';
import { ProfileValidation } from '@/lib/validations';
import { ErrorType } from '@/types';

export const UpdateProfile = () => {
  const [updatedUserError, setUpdatedUserError] = useState('');
  const navigate = useNavigate();
  const { currentUser, updateUser } = useUserContext();
  const [avatar, setAvatar] = useState<string[]>([]);
  const { mutateAsync: updateCurrentUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: currentUser?.name,
      company: currentUser?.company,
      email: currentUser?.email,
      password: '',
    },
  });

  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    try {
      const updatedUserData = {
        id: currentUser?.id || '',
        user: {
          name: value.name,
          company: value.company,
          email: value.email,
          password: value.password,
          avatar: avatar[0],
        },
      };
      const response = await updateCurrentUser(updatedUserData);

      if (response?.status === 200) {
        successToast('Profile updated successfully!');
        updateUser(response.data);
        navigate(`/profile`);
      } else {
        throw new Error(`Unexpected response status: ${response?.status}`);
      }
    } catch (err) {
      const error = err as ErrorType;
      const errorMessage =
        error?.response?.data?.message || 'Failed to update profile.';
      failureToast(errorMessage);
      setUpdatedUserError(errorMessage);
    }
  };

  return (
    <section className="min-h-screen mt-20">
      <div className="mx-auto max-w-xl px-6 lg:px-8 grid gap-3">
        <div className="flex items-center gap-2 mt-4">
          <TiEdit size={20} />
          <h2 className="font-semibold">Update Profile</h2>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="grid gap-3 pb-48"
        >
          <div className="flex gap-3 items-end">
            <div>
              <p>Photo</p>
              <img
                src={
                  avatar[0] || currentUser?.avatar || '/user-placeholder.svg'
                }
                alt="profile"
                className="h-24 w-24 rounded-full"
              />
            </div>
            <div>
              <UploadWidget
                uwConfig={{
                  cloudName: 'cloudinary-images-platform',
                  uploadPreset: 'scout-properties',
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: 'avatars',
                }}
                setState={setAvatar}
              />
            </div>
          </div>
          <Input
            label="Name"
            id="name"
            type="text"
            error={errors?.name?.message}
            {...register('name')}
          />
          <Input
            label="company"
            id="company"
            type="text"
            error={errors?.company?.message}
            {...register('company')}
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
          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              variant="inverted"
              onClick={() => navigate(-1)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? <Loader /> : 'Update Profile'}
            </Button>
          </div>
          {updatedUserError && (
            <div className="text-center">
              <ErrorMessage error={updatedUserError} />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
