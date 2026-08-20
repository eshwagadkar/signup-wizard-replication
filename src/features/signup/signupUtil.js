export function createDateFromParts(day, month, year) {
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}

export function calculateAge(dateOfBirth, today = new Date()) {
  let age =
    today.getFullYear() -
    dateOfBirth.getFullYear();

  const monthDifference =
    today.getMonth() -
    dateOfBirth.getMonth();

  const birthdayHasNotOccurred =
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < dateOfBirth.getDate());

  if (birthdayHasNotOccurred) {
    age -= 1;
  }

  return age;
}

export function formatDob(day, month, year) {
  return [
    String(day).padStart(2, "0"),
    String(month).padStart(2, "0"),
    String(year),
  ].join("/");
}