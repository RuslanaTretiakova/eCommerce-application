import type { IFormData } from '../../types/interfaces';

export function transformFormData(formData: IFormData) {
  const trimmedData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, value.trim()]),
  ) as IFormData;

  return {
    email: trimmedData.email,
    password: trimmedData.password,
    firstName: trimmedData.firstName,
    lastName: trimmedData.lastName,
    dateOfBirth: trimmedData.dateOfBirth,
    addresses: [
      {
        streetName: trimmedData.street,
        city: trimmedData.city,
        postalCode: trimmedData.postalCode,
        country: trimmedData.country.toUpperCase(),
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
  };
}
