export const isUndefined = (value: any) => {
  return typeof value === 'undefined';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export const isInvalid = (value: any): value is null | undefined => {
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
