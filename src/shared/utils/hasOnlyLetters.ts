/**
 * Checks if a string contains any number.
 */
const hasOnlyLetters = (string: string): boolean => {
  const regex = (/^(\040?)+[a-zA-Z]+(\040?)+$/g);

  const isAlpha = regex.exec(string);

  return isAlpha ? true : false;
};

export { hasOnlyLetters };
