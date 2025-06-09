import { useRef, useState } from 'react';
import { updateCustomerViaApi } from '../../../api/customer/updateCustomer';
import { showNotification } from '../../../utils/toastify/showNotification';
import type { CustomerUpdateAction } from '@commercetools/platform-sdk';
import type { IAddress, IAddressFormFields, IUserProfile } from '../../../types/interfaces';

const defaultAddressFormValues: IAddressFormFields = {
  streetName: '',
  city: '',
  postalCode: '',
  country: '',
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: false,
};

export function useAddressManagement(
  user: IUserProfile | null,
  setUser: (data: IUserProfile) => void,
  token: string | null,
) {
  const [addressFormValues, setAddressFormValues] =
    useState<IAddressFormFields>(defaultAddressFormValues);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  const addressFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IAddressFormFields;
  }>(null);

  const prepareAddAddress = () => {
    setAddressFormValues(defaultAddressFormValues);
    setEditingAddressId(null);
    setAddressModalOpen(true);
  };

  const openEditAddressModal = (address: IAddress) => {
    setAddressFormValues({
      streetName: address.streetName,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
      isDefaultBillingAddress: address.isDefaultBillingAddress ?? false,
      isDefaultShippingAddress: address.isDefaultShippingAddress ?? false,
    });
    setEditingAddressId(address.id);
    setAddressModalOpen(true);
  };

  const cancelAddress = () => {
    setAddressFormValues(defaultAddressFormValues);
    setEditingAddressId(null);
    setAddressModalOpen(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!user || !token) return;

    try {
      const actions: CustomerUpdateAction[] = [{ action: 'removeAddress', addressId }];
      const address = user.addresses.find((a) => a.id === addressId);
      if (!address) return;

      if (address.isDefaultBillingAddress) {
        actions.push({ action: 'setDefaultBillingAddress' });
      }
      if (address.isDefaultShippingAddress) {
        actions.push({ action: 'setDefaultShippingAddress' });
      }

      const updatedUser = await updateCustomerViaApi(user.id, user.version, actions, token);
      const remainingAddresses = user.addresses.filter((addr) => addr.id !== addressId);

      setUser({ ...updatedUser, addresses: remainingAddresses });
      showNotification({ text: 'Address deleted successfully.', type: 'info' });
    } catch (error) {
      console.error('Delete error:', error);
      showNotification({ text: 'Failed to delete address.', type: 'error' });
    }
  };

  const saveAddress = async () => {
    if (!user || !addressFormRef.current || !token) return;

    const isValid = await addressFormRef.current.trigger();
    if (!isValid) {
      showNotification({ text: 'Please fix validation errors.', type: 'error' });
      return;
    }

    const updatedData = addressFormRef.current.getValues();
    let actions: CustomerUpdateAction[] = [];

    if (editingAddressId) {
      actions.push({
        action: 'changeAddress',
        addressId: editingAddressId,
        address: updatedData,
      });

      if (updatedData.isDefaultBillingAddress) {
        actions.push({ action: 'setDefaultBillingAddress', addressId: editingAddressId });
      }
      if (updatedData.isDefaultShippingAddress) {
        actions.push({ action: 'setDefaultShippingAddress', addressId: editingAddressId });
      }

      try {
        const updatedUser = await updateCustomerViaApi(user.id, user.version, actions, token);
        setUser(updatedUser);
        setAddressModalOpen(false);
        setEditingAddressId(null);
        showNotification({ text: 'Address updated successfully.', type: 'info' });
      } catch (err) {
        console.error(err);
        showNotification({ text: 'Failed to update address.', type: 'error' });
      }
    } else {
      actions.push({ action: 'addAddress', address: updatedData });

      try {
        const updatedUser = await updateCustomerViaApi(user.id, user.version, actions, token);

        const newAddress = updatedUser.addresses.find(
          (addr: IAddress) =>
            addr.streetName === updatedData.streetName &&
            addr.city === updatedData.city &&
            addr.postalCode === updatedData.postalCode &&
            addr.country === updatedData.country,
        );

        if (!newAddress) {
          showNotification({ text: 'Address added but not found.', type: 'info' });
          return;
        }

        const setDefaultActions: CustomerUpdateAction[] = [];

        if (updatedData.isDefaultBillingAddress) {
          setDefaultActions.push({ action: 'setDefaultBillingAddress', addressId: newAddress.id });
        }
        if (updatedData.isDefaultShippingAddress) {
          setDefaultActions.push({ action: 'setDefaultShippingAddress', addressId: newAddress.id });
        }

        const finalUser =
          setDefaultActions.length > 0
            ? await updateCustomerViaApi(
                updatedUser.id,
                updatedUser.version,
                setDefaultActions,
                token,
              )
            : updatedUser;

        setUser(finalUser);
        setAddressModalOpen(false);
        showNotification({ text: 'Address added successfully.', type: 'info' });
      } catch (err) {
        console.error(err);
        showNotification({ text: 'Failed to add address.', type: 'error' });
      }
    }
  };

  const setDefaultAddress = async (type: 'billing' | 'shipping', addressId: string) => {
    if (!user || !token) return;

    const action: CustomerUpdateAction =
      type === 'billing'
        ? { action: 'setDefaultBillingAddress', addressId }
        : { action: 'setDefaultShippingAddress', addressId };

    try {
      const updatedUser = await updateCustomerViaApi(user.id, user.version, [action], token);
      const updatedAddresses = user.addresses.map((addr) => ({
        ...addr,
        isDefaultBillingAddress: updatedUser.defaultBillingAddressId === addr.id,
        isDefaultShippingAddress: updatedUser.defaultShippingAddressId === addr.id,
      }));

      setUser({
        ...user,
        version: updatedUser.version,
        defaultBillingAddressId: updatedUser.defaultBillingAddressId,
        defaultShippingAddressId: updatedUser.defaultShippingAddressId,
        addresses: updatedAddresses,
      });

      showNotification({ text: `Set as default ${type} address.`, type: 'info' });
    } catch (err) {
      console.error(err);
      showNotification({ text: 'Failed to set default address.', type: 'error' });
    }
  };

  return {
    addressFormRef,
    addressFormValues,
    setAddressFormValues,
    editingAddressId,
    setEditingAddressId,
    isAddressModalOpen,
    setAddressModalOpen,
    prepareAddAddress,
    openEditAddressModal,
    cancelAddress,
    saveAddress,
    handleDeleteAddress,
    setDefaultAddress,
  };
}
