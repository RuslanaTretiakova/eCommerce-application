import type { IAddress } from '../../types/interfaces';
import AddressCard from './AddressCard';

function UserAddresses({ addresses }: { addresses: IAddress[] }) {
  return (
    <>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </>
  );
}

export default UserAddresses;
