import { useState, useRef } from 'react';
import { useUserProfile } from '../../components/user-profile/hooks/useUserProfile';
import type { IAddress } from '../../types/interfaces';
import type {
  IAddressFormFields,
  IPasswordFormFields,
  IUserProfileFormFields,
} from '../../components/user-profile/forms/userProfileFormTypes';

import './userLoginProfile.scss';

import EditableCard from '../../components/ui/editable-card/EditableCard';
import PersonalInfo from '../../components/user-profile/PersonalInfo';
import UserAddresses from '../../components/user-profile/UserAddresses';
import EditForm from '../../components/ui/form/EditForm';
import Modal from '../../components/ui/modal/editModal/Modal';

import { passwordFields } from '../../components/user-profile/forms/passwordFields';
import { addressFields } from '../../components/user-profile/forms/addressFields';
import { personalFields } from '../../components/user-profile/forms/personalFields';
import { createDefaultAddress } from '../../components/user-profile/utils/defaultAddress';
import { usePasswordChange } from '../../components/user-profile/hooks/usePasswordChange';
import { usePersonalInfo } from '../../components/user-profile/hooks/usePersonalInfo';

const defaultAddressFormValues: IAddressFormFields = {
  streetName: '',
  city: '',
  postalCode: '',
  country: '',
};

function UserLoginProfile() {
  const { user, setUser } = useUserProfile();

  const billingAddress =
    user?.addresses.find((a) => a.isDefaultBillingAddress) ??
    user?.addresses.find((a) => !a.isDefaultShippingAddress) ??
    createDefaultAddress('billing');

  const shippingAddress =
    user?.addresses.find((a) => a.isDefaultShippingAddress) ??
    user?.addresses.find((a) => !a.isDefaultBillingAddress) ??
    createDefaultAddress('shipping');

  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [isShippingModalOpen, setShippingModalOpen] = useState(false);

  const [editedAddress, setEditedAddress] = useState<IAddress | null>(null);
  const [addressFormValues, setAddressFormValues] =
    useState<IAddressFormFields>(defaultAddressFormValues);

  const addressFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IAddressFormFields;
  }>(null);

  const {
    passwordFormValues,
    setPasswordFormValues,
    isPasswordModalOpen,
    openPasswordModal,
    cancelPassword,
    savePassword,
    passwordFormRef,
  } = usePasswordChange(user, setUser);

  const {
    personalFormValues,
    setPersonalFormValues,
    isPersonalModalOpen,
    openPersonalModal,
    cancelPersonal,
    savePersonal,
    personalFormRef,
  } = usePersonalInfo(user, setUser);

  const openAddressModal = (type: 'billing' | 'shipping') => {
    const address = type === 'billing' ? billingAddress : shippingAddress;
    setEditedAddress({ ...address });
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

  const saveAddress = async () => {
    if (!editedAddress || !user || !addressFormRef.current) return;
    const isValid = await addressFormRef.current.trigger();
    if (!isValid) return;

    const updatedData = addressFormRef.current.getValues();
    const updatedAddress = { ...editedAddress, ...updatedData };

    const addressExists = user.addresses.some((a) => a.id === updatedAddress.id);
    const updatedAddresses = addressExists
      ? user.addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
      : [...user.addresses, updatedAddress];

    setUser({ ...user, addresses: updatedAddresses });
    setEditedAddress(null);
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

          <EditableCard title="Change Password" onEdit={openPasswordModal}>
            <p>You can change your password here.</p>
          </EditableCard>

          <Modal
            title="Edit Personal Info"
            isOpen={isPersonalModalOpen}
            onSave={savePersonal}
            onClose={cancelPersonal}
          >
            <EditForm<IUserProfileFormFields>
              ref={personalFormRef}
              fields={personalFields}
              initialValues={personalFormValues}
              onChange={setPersonalFormValues}
            />
          </Modal>

          {showAddressModal && (
            <Modal title={modalTitle} isOpen onSave={saveAddress} onClose={cancelAddress}>
              <EditForm<IAddressFormFields>
                ref={addressFormRef}
                fields={addressFields}
                initialValues={addressFormValues}
                onChange={setAddressFormValues}
              />
            </Modal>
          )}

          <Modal
            title="Change Password"
            isOpen={isPasswordModalOpen}
            onSave={savePassword}
            onClose={cancelPassword}
          >
            <EditForm<IPasswordFormFields>
              ref={passwordFormRef}
              fields={passwordFields}
              initialValues={passwordFormValues}
              onChange={setPasswordFormValues}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default UserLoginProfile;
