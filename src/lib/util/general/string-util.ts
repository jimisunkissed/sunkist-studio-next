export const errorMessage = (error: any) => (error instanceof Error ? error.message : 'An unknown error occured');

export const camelCaseToText = (str: string): string => {
  if (str) {
    return str
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return '';
};

export const snakeCaseToText = (str: string): string => {
  if (str) {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return '';
};

export const kebabCaseToText = (str: string): string => {
  if (str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return '';
};

export const joinWithCommaAmp = (array: (string | number)[]): string => {
  const length = array.length;
  if (length === 0) return '';
  if (length === 1) return String(array[0]);

  return [array.slice(0, -1).join(', '), array[length - 1]].join(' & ');
};

export const convertToSlug = (text: string): string => {
  return (text ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
