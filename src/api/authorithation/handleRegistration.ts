import type { IFormData } from '../../types/interfaces';
import { transformFormData } from '../../utils/formUtils/transformFormData';
import type { NavigateFunction } from 'react-router-dom';
import { showNotification } from '../../utils/toastify/showNotification';
import { fetchCustomerToken } from '../sdkClient';
import { getRegistrationErrorMessage } from '../../utils/errors/getRegistrationErrorMessage';

export const handleRegistration = async (
  formData: IFormData,
  navigate: NavigateFunction,
  setToken: (token: string) => void,
): Promise<void> => {
  const customerDraft = transformFormData(formData);

  try {
    const response = await fetch('/.netlify/functions/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerDraft),
    });

    const result = await response.json();

    switch (response.status) {
      case 200:
      case 201:
        showNotification({ text: 'Registration successful!', type: 'success' });

        const token = await fetchCustomerToken(formData.email, formData.password);
        setToken(token);

        navigate('/', { replace: true });
        break;

      default:
        showNotification({
          text: getRegistrationErrorMessage(response.status, result.error),
          type: 'error',
        });
        break;
    }
  } catch (error) {
    console.error('Registration failed:', error);
    showNotification({ text: 'Network error. Please try again later.', type: 'error' });
  }
};
