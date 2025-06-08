import { useState, useRef } from 'react';
import type { IUserProfile } from '../../../types/interfaces';
import type { IPasswordFormFields } from '../forms/userProfileFormTypes';
import { showNotification } from '../../../utils/toastify/showNotification';
import { changeCustomerPassword } from '../../../api/customer/changeCustomerPassword';
import { useAuth } from '../../../api/authorithation/AuthToken';
import { reAuthenticate } from '../../../api/authorithation/reAuthenticate';

export const usePasswordChange = (
  user: IUserProfile | null,
  setUser: (user: IUserProfile) => void,
) => {
  const { token, setToken } = useAuth();

  const defaultValues: IPasswordFormFields = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [passwordFormValues, setPasswordFormValues] = useState(defaultValues);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const passwordFormRef = useRef<{
    trigger: () => Promise<boolean>;
    getValues: () => IPasswordFormFields;
  }>(null);

  const openPasswordModal = () => {
    setPasswordFormValues(defaultValues);
    setPasswordModalOpen(true);
  };

  const cancelPassword = () => {
    setPasswordFormValues(defaultValues);
    setPasswordModalOpen(false);
  };

  const savePassword = async () => {
    if (!passwordFormRef.current || !user || !token) {
      showNotification({ text: 'Missing form or user context.', type: 'error' });
      return;
    }

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

      const authResponse = await reAuthenticate(user.email, newPassword);
      if (authResponse.access_token) {
        setToken(authResponse.access_token, authResponse.scope);
        showNotification({ text: 'Password changed and re-authenticated.', type: 'info' });
      } else {
        showNotification({ text: 'Re-authentication failed.', type: 'error' });
      }

      setPasswordModalOpen(false);
      setPasswordFormValues(defaultValues);
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
