export const trimString = (str, maxLength) => {
  const countString = str.length;
  if (countString > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}