export const isInvalidNumber = (value: any): value is null | undefined => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'number' && isNaN(value))
  );
};

export const isEven = (value: number) => {
  return value % 2 === 0;
};

export const isOdd = (value: number) => {
  return value % 2 === 1;
};
