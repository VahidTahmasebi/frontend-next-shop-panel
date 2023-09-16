export function toLocalDateString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocalDateString("fa-IR", options);
}
