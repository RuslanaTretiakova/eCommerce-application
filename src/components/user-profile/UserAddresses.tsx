import type { IAddress } from '../../types/interfaces';

interface Props {
  addresses: IAddress[];
  onSetDefault: (type: 'billing' | 'shipping', addressId: string) => void;
}

function UserAddresses({ addresses, onSetDefault }: Props) {
  return (
    <div className="user-addresses">
      {addresses.map((address) => {
        const billingId = `billing-${address.id}`;
        const shippingId = `shipping-${address.id}`;

        return (
          <div key={address.id} className="user-addresses__card">
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

            <div className="user-addresses__input">
              <label htmlFor={billingId}>
                <input
                  className="user-addresses__input-small"
                  id={billingId}
                  name={billingId}
                  type="checkbox"
                  checked={!!address.isDefaultBillingAddress}
                  onChange={() => onSetDefault('billing', address.id)}
                />
                Set as default billing
              </label>
            </div>

            <div className="user-addresses__input">
              <label htmlFor={shippingId}>
                <input
                  className="user-addresses__input-small"
                  id={shippingId}
                  name={shippingId}
                  type="checkbox"
                  checked={!!address.isDefaultShippingAddress}
                  onChange={() => onSetDefault('shipping', address.id)}
                />
                Set as default shipping
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserAddresses;
