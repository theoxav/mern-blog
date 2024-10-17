export const filterEmptyFields = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== "" && data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
