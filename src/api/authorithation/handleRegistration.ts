import type { IFormData } from '../../types/interfaces';
import { transformFormData } from '../../utils/formUtils/transformFormData';
import { showNotification } from '../../utils/toastify/showNotification';
import { getRegistrationErrorMessage } from '../../utils/errors/getRegistrationErrorMessage';

export const handleRegistration = async (formData: IFormData): Promise<void> => {
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
        showNotification({
          text: 'Registration successful!',
          type: 'success',
        });
        break;
      // todo: Call login function
      // todo: Save access token
      // todo: Redirect to main page

      default:
        showNotification({
          text: getRegistrationErrorMessage(response.status, result.error),
          type: 'error',
        });
        break;
    }
  } catch (error) {
    console.error('Registration request failed:', error);
    showNotification({
      text: 'Network error. Please try again later.',
      type: 'error',
    });
  }
};
