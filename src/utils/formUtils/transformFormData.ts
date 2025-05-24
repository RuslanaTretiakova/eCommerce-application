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
        streetName: trimmedData.billingStreet,
        city: trimmedData.billingCity,
        postalCode: trimmedData.billingPostalCode,
        country: trimmedData.billingCountry.toUpperCase(),
      },
      {
        streetName: trimmedData.shippingStreet,
        city: trimmedData.shippingCity,
        postalCode: trimmedData.shippingPostalCode,
        country: trimmedData.shippingCountry.toUpperCase(),
      },
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 1,
  };
}
