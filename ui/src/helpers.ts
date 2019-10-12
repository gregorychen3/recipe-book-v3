export const capitalize = (s: string) =>
  s === "" ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
