import numeral from 'numeral';

export const formatTrustScore = (value: number) => {
  return numeral(value).format('0.0');
};
