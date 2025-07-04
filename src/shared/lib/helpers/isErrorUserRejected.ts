const isRejectedMessage = (error: string) => {
  const rejectedMessages = [
    'user disapproved requested methods',
    'user canceled',
    'user rejected the request',
    'user cancel',
    'user reject',
  ];

  return rejectedMessages.some((message) =>
    error.toLowerCase().includes(message),
  );
};

export const isErrorUserRejected = (error: unknown) => {
  if (typeof error === 'string' && isRejectedMessage(error)) {
    return true;
  }

  if (!error || typeof error !== 'object') {
    return false;
  }

  if ('code' in error && error.code === 'ACTION_REJECTED') {
    return true;
  }

  return (
    'message' in error &&
    typeof error.message === 'string' &&
    isRejectedMessage(error.message)
  );
};
