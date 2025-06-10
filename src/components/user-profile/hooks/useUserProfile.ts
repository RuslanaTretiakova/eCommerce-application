import { useEffect, useState } from 'react';
import { useAuth } from '../../../api/authorithation/AuthToken';
import type { IAddress, IUserProfile } from '../../../types/interfaces';

export const useUserProfile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch('/.netlify/functions/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await res.json();
        if (!res.ok) {
          console.error('Unauthorized:', data);
          return;
        }

        const mappedAddresses = (data.addresses || []).map((addr: IAddress) => ({
          ...addr,
          isDefaultBillingAddress: addr.id === data.defaultBillingAddressId,
          isDefaultShippingAddress: addr.id === data.defaultShippingAddressId,
        }));

        setUser({
          id: data.id,
          version: data.version,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          addresses: mappedAddresses,
          defaultBillingAddressId: data.defaultBillingAddressId,
          defaultShippingAddressId: data.defaultShippingAddressId,
        });
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  return { user, setUser };
};
