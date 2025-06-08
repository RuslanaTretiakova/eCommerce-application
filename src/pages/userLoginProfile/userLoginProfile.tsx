import { useState, useRef } from 'react';
import { useUserProfile } from '../../components/user-profile/hooks/useUserProfile';
import type { IUserProfile, IAddress } from '../../types/interfaces';

import './userLoginProfile.scss';

import type {
  IAddressFormFields,
  IUserProfileFormFields,
  IPasswordFormFields,
} from '../../components/user-profile/forms/userProfileFormTypes';

import EditableCard from '../../components/ui/editable-card/EditableCard';
import PersonalInfo from '../../components/user-profile/PersonalInfo';
import UserAddresses from '../../components/user-profile/UserAddresses';
import EditForm from '../../components/ui/form/EditForm';
import { showNotification } from '../../utils/toastify/showNotification';
import { createDefaultAddress } from '../../components/user-profile/utils/defaultAddress';
import { personalFields } from '../../components/user-profile/forms/personalFields';
import { addressFields } from '../../components/user-profile/forms/addressFields';
import Modal from '../../components/ui/modal/editModal/Modal';
import { passwordFields } from '../../components/user-profile/forms/passwordFields';

const defaultUserFormValues: IUserProfileFormFields = {
  email: '',
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

const defaultPasswordFormValues: IPasswordFormFields = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
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

  const [isPersonalModalOpen, setPersonalModalOpen] = useState(false);
  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [isShippingModalOpen, setShippingModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const [editedUser, setEditedUser] = useState<IUserProfile | null>(null);
  const [formValues, setFormValues] = useState<IUserProfileFormFields>(defaultUserFormValues);

  const [editedAddress, setEditedAddress] = useState<IAddress | null>(null);
  const [addressFormValues, setAddressFormValues] =
    useState<IAddressFormFields>(defaultAddressFormValues);

  const [passwordFormValues, setPasswordFormValues] =
    useState<IPasswordFormFields>(defaultPasswordFormValues);

  const personalFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IUserProfileFormFields;
  }>(null);

  const addressFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IAddressFormFields;
  }>(null);

  const passwordFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IPasswordFormFields;
  }>(null);

  const openPersonalModal = () => {
    if (!user) return;
    setEditedUser(user);
    setFormValues({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
    });
    setPersonalModalOpen(true);
  };

  const savePersonal = async () => {
    if (!editedUser || !personalFormRef.current) return;
    const isValid = await personalFormRef.current.trigger();
    if (!isValid) {
      showNotification({ text: 'Please correct the errors before saving.', type: 'error' });
      return;
    }

    const updatedData = personalFormRef.current.getValues();
    const updated = { ...editedUser, ...updatedData };
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
    if (!isValid) {
      showNotification({ text: 'Please fix the address form errors.', type: 'error' });
      return;
    }

    const updatedData = addressFormRef.current.getValues();
    const updatedAddress = { ...editedAddress, ...updatedData };

    const addressExists = user.addresses.some((a) => a.id === updatedAddress.id);
    const updatedAddresses = addressExists
      ? user.addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
      : [...user.addresses, updatedAddress];

    setUser({ ...user, addresses: updatedAddresses });
    setEditedAddress(null);
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

  const openPasswordModal = () => {
    setPasswordFormValues(defaultPasswordFormValues);
    setPasswordModalOpen(true);
  };

  const savePassword = async () => {
    if (!passwordFormRef.current) return;
    const isValid = await passwordFormRef.current.trigger();
    if (!isValid) {
      showNotification({ text: 'Please fix the password form errors.', type: 'error' });
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = passwordFormRef.current.getValues();
    console.log(currentPassword);
    if (newPassword !== confirmPassword) {
      showNotification({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    try {
      // todo: Implement changeUserPassword logic to update the password
      // await changeUserPassword({ currentPassword, newPassword });

      showNotification({ text: 'Password changed successfully.', type: 'info' });
      setPasswordModalOpen(false);
      setPasswordFormValues(defaultPasswordFormValues);
    } catch {
      showNotification({
        text: 'Failed to change password. Please check your current password.',
        type: 'error',
      });
    }
  };

  const cancelPassword = () => {
    setPasswordFormValues(defaultPasswordFormValues);
    setPasswordModalOpen(false);
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
              initialValues={formValues}
              onChange={setFormValues}
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
