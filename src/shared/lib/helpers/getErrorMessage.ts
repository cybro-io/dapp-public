import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ error: string | null }>;

  let errorMessage = axiosError?.response?.data?.error;
  if (errorMessage) {
    return errorMessage;
  }

  errorMessage = axiosError?.message;

  if (errorMessage) {
    return errorMessage;
  }

  return 'Unknown error';
};
