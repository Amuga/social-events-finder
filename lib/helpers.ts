export const getFormattedDate = (date: Date) => {
  return `${date.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })} - ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const normalizeImagePath = (path: string) => {
  if (!path) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
};
