export function isOldEnough(value: string | boolean | undefined): true | string {
  if (typeof value !== 'string') {
    return 'Invalid date of birth';
  }

  const birthDate = new Date(value);
  if (isNaN(birthDate.getTime())) {
    return 'Invalid date format';
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 13 ? true : 'You must be at least 13 years old';
}
