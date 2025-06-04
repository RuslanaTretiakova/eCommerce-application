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
          id: addr.id,
          streetName: addr.streetName || '',
          streetNumber: addr.streetNumber || '',
          city: addr.city || '',
          postalCode: addr.postalCode || '',
          country: addr.country || '',
          isDefaultBillingAddress: addr.isDefaultBillingAddress || false,
          isDefaultShippingAddress: addr.isDefaultShippingAddress || false,
        }));

        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth || 'Not set',
          addresses: mappedAddresses,
        });
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  return { user };
};
