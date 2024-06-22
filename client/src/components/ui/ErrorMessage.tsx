import { FC } from 'react';

type ErrorMessage = { error: string; id?: string };

export const ErrorMessage: FC<ErrorMessage> = ({ error, id }) => {
  return (
    <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
      {error}
    </p>
  );
};
