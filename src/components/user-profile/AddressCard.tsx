import type { IAddress } from '../../types/interfaces';

function AddressCard({ address }: { address: IAddress }) {
  return (
    <>
      <p>
        <span className="label">Street:</span>
        {address.streetName}
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
