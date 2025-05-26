import type { IFormData } from '../../types/interfaces';

export function transformFormData(formData: IFormData) {
  const trimmedData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value,
    ]),
  ) as IFormData;

  const addresses = [
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
  ];

  const result: Record<string, unknown> = {
    email: trimmedData.email,
    password: trimmedData.password,
    firstName: trimmedData.firstName,
    lastName: trimmedData.lastName,
    dateOfBirth: trimmedData.dateOfBirth,
    addresses,
    billingAddressIds: [0],
    shippingAddressIds: [1],
  };

  const billingIsDefault = trimmedData.setDefaultBilling;
  const shippingIsDefault = trimmedData.setDefaultShipping;

  if (billingIsDefault) {
    result.defaultBillingAddress = 0;
  }

  if (shippingIsDefault) {
    result.defaultShippingAddress = 1;
  }

  if (!billingIsDefault && !shippingIsDefault) {
    result.defaultBillingAddress = 0;
  }

  return result;
}
