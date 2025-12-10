export const trimText = (text: string, toTrim: number) => {
  const isLarger = text.length > toTrim;
  return isLarger ? text.substring(0, toTrim) + "..." : text;
};

export const getFallbackText = (text: string = "", toTrim: number) => {
  return text.substring(0, toTrim || 2);
};
