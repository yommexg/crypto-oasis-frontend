export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatDate2(utcString: string, offsetHours = 0) {
  const utcDate = new Date(utcString);

  // Convert to local time by adding offset (in minutes)
  const localMillis = utcDate.getTime() + offsetHours * 60 * 60 * 1000;
  const localDate = new Date(localMillis);

  // Get weekday and time
  const weekday = localDate.toLocaleDateString("en-US", { weekday: "long" });
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");

  // Format output
  const gmtNumber = offsetHours > 0 ? `+${offsetHours}` : "";
  return `${weekday}, ${hours}:${minutes} GMT${gmtNumber}`;
}
