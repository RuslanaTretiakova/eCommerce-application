import { useState, useRef } from 'react';
import type { IUserProfile } from '../../../types/interfaces';
import type { IPasswordFormFields } from '../forms/userProfileFormTypes';
import { showNotification } from '../../../utils/toastify/showNotification';
import { changeCustomerPassword } from '../../../api/customer/changeCustomerPassword';
import { useAuth } from '../../../api/authorithation/AuthToken';

export const usePasswordChange = (
  user: IUserProfile | null,
  setUser: (user: IUserProfile) => void,
) => {
  const { token } = useAuth();

  const defaultPasswordFormValues: IPasswordFormFields = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [passwordFormValues, setPasswordFormValues] =
    useState<IPasswordFormFields>(defaultPasswordFormValues);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const passwordFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IPasswordFormFields;
  }>(null);

  const openPasswordModal = () => {
    setPasswordFormValues(defaultPasswordFormValues);
    setPasswordModalOpen(true);
  };

  const cancelPassword = () => {
    setPasswordFormValues(defaultPasswordFormValues);
    setPasswordModalOpen(false);
  };

  const savePassword = async () => {
    if (!passwordFormRef.current || !user || !token) return;
    const isValid = await passwordFormRef.current.trigger();
    if (!isValid) {
      showNotification({ text: 'Please fix the password form errors.', type: 'error' });
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = passwordFormRef.current.getValues();

    if (newPassword !== confirmPassword) {
      showNotification({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    try {
      const updatedUser = await changeCustomerPassword(
        user.id,
        user.version,
        currentPassword,
        newPassword,
        token,
      );
      setUser(updatedUser);
      showNotification({ text: 'Password changed successfully.', type: 'info' });
      setPasswordModalOpen(false);
      setPasswordFormValues(defaultPasswordFormValues);
    } catch (error) {
      console.error('Password change failed:', error);
      showNotification({
        text: 'Failed to change password. Please check your current password.',
        type: 'error',
      });
    }
  };

  return {
    passwordFormValues,
    setPasswordFormValues,
    isPasswordModalOpen,
    openPasswordModal,
    cancelPassword,
    savePassword,
    passwordFormRef,
  };
};
