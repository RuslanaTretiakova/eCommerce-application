import type { IAddress, IUserProfile } from '../../../types/interfaces';

export function areAddressesEqual(a: IAddress, b: IAddress): boolean {
  return (
    a.streetName === b.streetName &&
    a.city === b.city &&
    a.postalCode === b.postalCode &&
    a.country === b.country
  );
}

export function getAddressTitle(
  address: IAddress,
  user: IUserProfile,
  duplicates: IAddress[],
  index: number,
): string {
  const isBilling = user.defaultBillingAddressId === address.id;
  const isShipping = user.defaultShippingAddressId === address.id;

  let baseTitle = 'Address';
  if (isBilling && isShipping) {
    baseTitle = 'Billing & Shipping Address';
  } else if (isBilling) {
    baseTitle = 'Billing Address';
  } else if (isShipping) {
    baseTitle = 'Shipping Address';
  }

  return `${baseTitle}${duplicates.length > 1 ? ` #${index + 1}` : ''}`;
}
