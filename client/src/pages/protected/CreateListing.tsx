import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import 'react-quill/dist/quill.snow.css';

import UploadWidget from '@/components/shared/UploadWidget';
import { Button, ErrorMessage, Input, Loader, Select } from '@/components/ui';
import { useCreateListing } from '@/lib/react-query/mutations';
import { ListingValidation } from '@/lib/validations';
import { ErrorType } from '@/types';

export const CreateListing = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ListingValidation>>({
    resolver: zodResolver(ListingValidation),
    defaultValues: {
      type: 'Rent',
      property: 'Apartment',
      parking: 'Available',
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mutateAsync: createListing, isPending } = useCreateListing();
  const quillRef = useRef<ReactQuill | null>(null);

  const handleCreateListing = async (
    data: z.infer<typeof ListingValidation>,
  ) => {
    try {
      const listingData = {
        title: data.title,
        images,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        price: data.price,
        address: data.address,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type,
        property: data.property,
      };

      const listingDetails = {
        description: data.description,
        parking: data.parking,
        size: data.size || undefined,
        school: data.school || undefined,
        bus: data.bus || undefined,
        restaurant: data.restaurant || undefined,
      };

      const res = await createListing({ listingData, listingDetails });
      navigate('/listings/' + res.id);
    } catch (err) {
      const error = err as ErrorType;
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <section className="min-h-screen mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-3">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form
            onSubmit={handleSubmit(handleCreateListing)}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            <div>
              <Input
                id="title"
                label="Title"
                {...register('title')}
                error={errors.title?.message}
              />
            </div>
            <div>
              <Input
                id="price"
                type="number"
                label="Price"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
              />
            </div>
            <div>
              <Input
                id="address"
                label="Address"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>
            <div>
              <Input
                id="city"
                label="City"
                {...register('city')}
                error={errors.city?.message}
              />
            </div>
            <div className="col-span-full">
              <label>
                Description
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      onChange={field.onChange}
                      value={field.value}
                      ref={(el) => {
                        field.ref(el);
                        quillRef.current = el;
                      }}
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <Input
                id="bedroom"
                type="number"
                label="Bedroom Number"
                {...register('bedroom', { valueAsNumber: true })}
                error={errors.bedroom?.message}
                min={1}
              />
            </div>
            <div>
              <Input
                id="bathroom"
                type="number"
                label="Bathroom Number"
                {...register('bathroom', { valueAsNumber: true })}
                error={errors.bathroom?.message}
                min={1}
              />
            </div>
            <div>
              <Input
                id="latitude"
                label="Latitude"
                {...register('latitude')}
                error={errors.latitude?.message}
              />
            </div>
            <div>
              <Input
                id="longitude"
                label="Longitude"
                {...register('longitude')}
                error={errors.longitude?.message}
              />
            </div>
            <div>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    id="Type"
                    label="Type"
                    options={[
                      { id: 'Rent', name: 'Rent' },
                      { id: 'Buy', name: 'Buy' },
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    error={errors.type?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="property"
                control={control}
                render={({ field }) => (
                  <Select
                    id="Property"
                    label="Property"
                    options={[
                      { id: 'Apartment', name: 'Apartment' },
                      { id: 'House', name: 'House' },
                      { id: 'Condo', name: 'Condo' },
                      { id: 'Land', name: 'Land' },
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    error={errors.property?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="parking"
                control={control}
                render={({ field }) => (
                  <Select
                    id="Parking"
                    label="Parking"
                    options={[
                      { id: 'Available', name: 'Available' },
                      { id: 'Unavailable', name: 'Unavailable' },
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    error={errors.parking?.message}
                  />
                )}
              />
            </div>
            <div>
              <Input
                id="size"
                type="number"
                label="Total Size (sqft)"
                {...register('size', { valueAsNumber: true })}
                error={errors.size?.message}
                min={0}
              />
            </div>
            <div>
              <Input
                id="school"
                type="number"
                label="School"
                {...register('school', { valueAsNumber: true })}
                error={errors.school?.message}
                min={0}
              />
            </div>
            <div>
              <Input
                id="bus"
                type="number"
                label="Bus"
                {...register('bus', { valueAsNumber: true })}
                error={errors.bus?.message}
                min={0}
              />
            </div>
            <div>
              <Input
                id="restaurant"
                type="number"
                label="Restaurant"
                {...register('restaurant', { valueAsNumber: true })}
                error={errors.restaurant?.message}
                min={0}
              />
            </div>
            <div className="col-span-full">
              <div className="mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                {images.map((image, index) => (
                  <img src={image} key={index} alt="listing image" />
                ))}
              </div>

              <UploadWidget
                uwConfig={{
                  cloudName: 'cloudinary-images-platform',
                  uploadPreset: 'scout-properties',
                  multiple: true,
                  folder: 'listingsImages',
                }}
                setState={setImages}
              />
            </div>
            <div className="flex gap-4 items-center col-span-full">
              <Button
                type="button"
                variant="inverted"
                onClick={() => navigate(-1)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                data-testid="create-listing-btn"
                type="submit"
                variant="primary"
                disabled={isPending}
              >
                {isPending ? <Loader /> : 'Create Listing'}
              </Button>
            </div>
            <div className="text-center">
              <ErrorMessage error={error} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
