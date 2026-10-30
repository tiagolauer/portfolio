const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export const formatDate = (date: Date): string => DATE_FORMAT.format(date);

export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);
