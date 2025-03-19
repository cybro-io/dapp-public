export const truncateMiddle = (
  str: string,
  sliceLength = 5,
  separator = '...',
) => {
  if (!str) {
    return '';
  }

  if (str.length <= sliceLength * 2 + separator.length) {
    return str;
  }

  const start = str.substring(0, sliceLength);
  const end = str.substring(str.length - sliceLength, str.length);

  return `${start}${separator}${end}`;
};
