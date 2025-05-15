export function isOldEnough(value: string): true | string {
  const today = new Date();
  const birthDate = new Date(value);

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 13 ? true : 'You must be at least 13 years old';
}
