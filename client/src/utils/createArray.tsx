export const createArray = (...args: (string | undefined)[]) => {
  const definedValues = args.filter((val) => val !== undefined);
  return definedValues.length > 0 ? definedValues : [];
};
