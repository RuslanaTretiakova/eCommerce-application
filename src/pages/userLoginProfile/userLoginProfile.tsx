import { useState } from 'react';
import { useUserProfile } from '../../components/user-profile/hooks/useUserProfile';
import type { IUserProfile, IAddress } from '../../types/interfaces';

import './userLoginProfile.scss';

import {
  personalFields,
  type IUserProfileFormFields,
} from '../../components/user-profile/forms/personalFields';
import {
  addressFields,
  type IAddressFormFields,
} from '../../components/user-profile/forms/addressFields';

import EditableCard from '../../components/ui/editable-card/EditableCard';
import PersonalInfo from '../../components/user-profile/PersonalInfo';
import UserAddresses from '../../components/user-profile/UserAddresses';
import Modal from '../../components/ui/modal/Modal';
import EditForm from '../../components/ui/form/EditForm';
import { showNotification } from '../../utils/toastify/showNotification';
import { createDefaultAddress } from '../../components/user-profile/utils/defaultAddress';

const defaultUserFormValues: IUserProfileFormFields = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};

const defaultAddressFormValues: IAddressFormFields = {
  streetName: '',
  city: '',
  postalCode: '',
  country: '',
};

function UserLoginProfile() {
  const { user, setUser } = useUserProfile();

  const billingAddress =
    user?.addresses.find((a) => a.isDefaultBillingAddress) ||
    user?.addresses[0] ||
    createDefaultAddress('billing');
  const shippingAddress =
    user?.addresses.find((a) => a.isDefaultShippingAddress) ||
    user?.addresses[0] ||
    createDefaultAddress('shipping');

  const [isPersonalModalOpen, setPersonalModalOpen] = useState(false);
  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [isShippingModalOpen, setShippingModalOpen] = useState(false);

  const [editedUser, setEditedUser] = useState<IUserProfile | null>(null);
  const [formValues, setFormValues] = useState<IUserProfileFormFields>(defaultUserFormValues);

  const [editedAddress, setEditedAddress] = useState<IAddress | null>(null);
  const [addressFormValues, setAddressFormValues] =
    useState<IAddressFormFields>(defaultAddressFormValues);

  const openPersonalModal = () => {
    if (!user) return;
    setEditedUser(user);
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
    });
    setPersonalModalOpen(true);
  };

  const savePersonal = () => {
    if (!editedUser) return;
    const updated = { ...editedUser, ...formValues };
    setEditedUser(updated);
    setUser(updated);
    showNotification({ text: 'Personal information saved successfully.', type: 'info' });
    setPersonalModalOpen(false);
  };

  const cancelPersonal = () => {
    setEditedUser(null);
    setFormValues(defaultUserFormValues);
    setPersonalModalOpen(false);
  };

  const openAddressModal = (type: 'billing' | 'shipping') => {
    const existing = type === 'billing' ? billingAddress : shippingAddress;
    const address = existing ?? createDefaultAddress(type);

    setEditedAddress(address);
    setAddressFormValues({
      streetName: address.streetName,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    });

    if (type === 'billing') {
      setBillingModalOpen(true);
    } else {
      setShippingModalOpen(true);
    }
  };

  const saveAddress = () => {
    if (!editedAddress || !user) return;

    const updatedAddress = { ...editedAddress, ...addressFormValues };
    const addressExists = user.addresses.some((a) => a.id === updatedAddress.id);
    const updatedAddresses = addressExists
      ? user.addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
      : [...user.addresses, updatedAddress];

    setUser({ ...user, addresses: updatedAddresses });
    setEditedAddress(updatedAddress);
    showNotification({ text: 'Address saved successfully.', type: 'info' });

    setBillingModalOpen(false);
    setShippingModalOpen(false);
  };

  const cancelAddress = () => {
    setEditedAddress(null);
    setAddressFormValues(defaultAddressFormValues);
    setBillingModalOpen(false);
    setShippingModalOpen(false);
  };

  const showAddressModal = isBillingModalOpen || isShippingModalOpen;
  const modalTitle = isBillingModalOpen
    ? 'Edit Billing Address'
    : isShippingModalOpen
      ? 'Edit Shipping Address'
      : '';

  return (
    <div className="user-login-profile">
      <div className="user-login-profile__header">
        {user && (
          <h2 className="user-login-profile__greeting">
            Welcome,
            {user.firstName}
          </h2>
        )}
      </div>

      {user && (
        <>
          <EditableCard title="Personal Info" onEdit={openPersonalModal}>
            <PersonalInfo user={user} />
          </EditableCard>

          <EditableCard title="Billing Address" onEdit={() => openAddressModal('billing')}>
            <UserAddresses addresses={[billingAddress]} />
          </EditableCard>

          <EditableCard title="Shipping Address" onEdit={() => openAddressModal('shipping')}>
            <UserAddresses addresses={[shippingAddress]} />
          </EditableCard>

          <Modal
            title="Edit Personal Info"
            isOpen={isPersonalModalOpen}
            onSave={savePersonal}
            onClose={cancelPersonal}
          >
            <EditForm fields={personalFields} initialValues={formValues} onChange={setFormValues} />
          </Modal>

          {showAddressModal && (
            <Modal title={modalTitle} isOpen onSave={saveAddress} onClose={cancelAddress}>
              <EditForm
                fields={addressFields}
                initialValues={addressFormValues}
                onChange={setAddressFormValues}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default UserLoginProfile;
