import type { IAddress } from '../../types/interfaces';
import AddressCard from './AddressCard';

const getAddressKey = (addr: IAddress) =>
  `${addr.streetName}|${addr.streetNumber}|${addr.city}|${addr.postalCode}|${addr.country}`;

function UserAddresses({ addresses }: { addresses: IAddress[] }) {
  const uniqueAddresses = (() => {
    const map = new Map<string, IAddress>();

    addresses.forEach((addr) => {
      const key = getAddressKey(addr);
      if (!map.has(key)) {
        map.set(key, addr);
      }
    });

    return Array.from(map.values());
  })();

  return (
    <>
      {uniqueAddresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </>
  );
}

export default UserAddresses;
