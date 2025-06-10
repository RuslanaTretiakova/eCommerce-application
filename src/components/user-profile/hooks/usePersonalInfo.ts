import { useState, useRef } from 'react';
import type { CustomerUpdateAction } from '@commercetools/platform-sdk';
import type { IUserProfileFormFields } from '../forms/userProfileFormTypes';
import { useAuth } from '../../../api/authorithation/AuthToken';
import type { IUserProfile } from '../../../types/interfaces';
import { showNotification } from '../../../utils/toastify/showNotification';
import { updateCustomerViaApi } from '../../../api/customer/updateCustomer';

const defaultUserFormValues: IUserProfileFormFields = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};

export function usePersonalInfo(user: IUserProfile | null, setUser: (u: IUserProfile) => void) {
  const { token } = useAuth();
  const [isPersonalModalOpen, setPersonalModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<IUserProfile | null>(null);
  const [personalFormValues, setPersonalFormValues] =
    useState<IUserProfileFormFields>(defaultUserFormValues);

  const personalFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IUserProfileFormFields;
  }>(null);

  const openPersonalModal = () => {
    if (!user) return;
    setEditedUser(user);
    setPersonalFormValues({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
    });
    setPersonalModalOpen(true);
  };

  const cancelPersonal = () => {
    setEditedUser(null);
    setPersonalFormValues(defaultUserFormValues);
    setPersonalModalOpen(false);
  };

  const savePersonal = async () => {
    if (!editedUser || !personalFormRef.current || !token) return;

    const isValid = await personalFormRef.current.trigger();
    if (!isValid) {
      showNotification({ text: 'Please correct the errors before saving.', type: 'error' });
      return;
    }

    const updatedData = personalFormRef.current.getValues();
    const actions: CustomerUpdateAction[] = [];

    if (editedUser.firstName !== updatedData.firstName) {
      actions.push({ action: 'setFirstName', firstName: updatedData.firstName });
    }
    if (editedUser.lastName !== updatedData.lastName) {
      actions.push({ action: 'setLastName', lastName: updatedData.lastName });
    }
    if (editedUser.email !== updatedData.email) {
      actions.push({ action: 'changeEmail', email: updatedData.email });
    }
    if (editedUser.dateOfBirth !== updatedData.dateOfBirth) {
      actions.push({ action: 'setDateOfBirth', dateOfBirth: updatedData.dateOfBirth });
    }

    if (actions.length === 0) {
      showNotification({ text: 'No changes to save.', type: 'info' });
      setPersonalModalOpen(false);
      return;
    }

    try {
      const updatedCustomer = await updateCustomerViaApi(
        editedUser.id,
        editedUser.version,
        actions,
        token,
      );
      setUser(updatedCustomer);
      showNotification({ text: 'Personal information updated.', type: 'info' });
      setPersonalModalOpen(false);
    } catch (error) {
      console.error('Failed to update personal info:', error);
      showNotification({ text: 'Failed to update profile.', type: 'error' });
    }
  };

  return {
    personalFormValues,
    setPersonalFormValues,
    isPersonalModalOpen,
    openPersonalModal,
    cancelPersonal,
    savePersonal,
    personalFormRef,
  };
}
