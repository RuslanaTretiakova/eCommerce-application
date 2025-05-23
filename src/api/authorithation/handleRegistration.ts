import type { IFormData } from '../../types/interfaces';
import { transformFormData } from '../../utils/formUtils/transformFormData';

export const handleRegistration = async (formData: IFormData): Promise<void> => {
  const customerDraft = transformFormData(formData);

  await fetch('/.netlify/functions/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerDraft),
  });

  // todo: Call login function
  // todo: Save access token
  // todo: Redirect to main page
};
