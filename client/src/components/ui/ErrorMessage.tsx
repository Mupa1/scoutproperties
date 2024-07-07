import { FC } from 'react';

type ErrorMessage = { error: string | undefined; id?: string };

export const ErrorMessage: FC<ErrorMessage> = ({ error, id }) => {
  return (
    <p
      className={`text-sm text-red-600 h-3 ${error ? 'visible' : 'invisible'}`}
      id={`${id}-error`}
    >
      {error}
    </p>
  );
};
