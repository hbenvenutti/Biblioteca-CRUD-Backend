/**
 * Removes useless spaces from string.
 * 
 * Turns it string into lowercase.
 */
const prepareStringToDatabase = (string: string) => {
  return string
    .trim()
    .toLowerCase();
};

export { prepareStringToDatabase };
