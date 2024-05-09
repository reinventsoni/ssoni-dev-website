export default function getFormattedDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date(dateString));
}
