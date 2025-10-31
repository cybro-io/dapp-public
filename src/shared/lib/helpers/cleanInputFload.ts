export function cleanFloatInput(inputStr: string, isPositive?: boolean) {
  let cleanedStr = inputStr.replace(/[^\d.-]/g, '');

  if (isPositive) {
    cleanedStr = cleanedStr.replace(/-/g, '');
  }

  const dotCount = (cleanedStr.match(/\./g) || []).length;
  if (dotCount > 1) {
    const parts = cleanedStr.split('.');
    cleanedStr = parts[0] + '.' + parts.slice(1).join('');
  }

  const minusCount = (cleanedStr.match(/-/g) || []).length;
  if (minusCount > 1) {
    cleanedStr = cleanedStr.replace(/-/g, '');
    cleanedStr = '-' + cleanedStr;
  }

  return cleanedStr;
}
