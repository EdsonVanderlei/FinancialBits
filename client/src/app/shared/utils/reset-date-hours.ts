export const resetDateHours = (date: Date, utc: boolean = false) => {
  const d = date;
  if (utc) d.setUTCHours(0, 0, 0, 0);
  else d.setHours(0, 0, 0, 0);
  return d;
};
