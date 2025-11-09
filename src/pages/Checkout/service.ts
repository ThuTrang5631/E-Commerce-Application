export const checkOut = (body: any) => {
  if (body) {
    return {
      isSuccess: true,
    };
  }

  return {
    isSuccess: false,
  };
};
