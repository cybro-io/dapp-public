import { BigNumberish, utils } from 'ethers';

/**
 * Converts a value from one unit to number
 * @param value
 * @param unitName
 */
export const formatUnits = (
  value: BigNumberish,
  unitName?: string | BigNumberish,
) => {
  try {
    return utils.formatUnits(value, unitName);
  } catch (e) {
    return '0.0';
  }
};
