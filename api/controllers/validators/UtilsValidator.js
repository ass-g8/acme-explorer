const isFloat = async (value) => {
    try {
      if (((Number.isInteger(value) && Number(value) % 1 === 0) ||
        (!Number.isInteger(value) && Number(value) % 1 !== 0)) &&
        Number(value) >= 0) {
        return Promise.resolve("Value is OK");
      } else {
        return Promise.reject(new Error("Value is invalid"));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export { isFloat };