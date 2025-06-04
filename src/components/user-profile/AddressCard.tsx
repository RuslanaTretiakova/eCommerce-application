import type { IAddress } from '../../types/interfaces';

function AddressCard({ address }: { address: IAddress }) {
  let label = 'Shipping Address';

  if (address.isDefaultBillingAddress && address.isDefaultShippingAddress)
    if (address.isDefaultBillingAddress) {
      label = 'Billing Address:';
    } else if (address.isDefaultShippingAddress) {
      label = 'Shipping Address:';
    }

  return (
    <>
      <p className="address-label">{label}</p>
      <p>
        <span className="label">Street:</span>
        {address.streetName}
      </p>
      <p>
        <span className="label">Number:</span>
        {address.streetNumber}
      </p>
      <p>
        <span className="label">City:</span>
        {address.city}
      </p>
      <p>
        <span className="label">Postal Code:</span>
        {address.postalCode}
      </p>
      <p>
        <span className="label">Country:</span>
        {address.country}
      </p>
    </>
  );
}

export default AddressCard;
