export const changeCustomerPassword = async (
  customerId: string,
  version: number,
  currentPassword: string,
  newPassword: string,
  accessToken: string,
) => {
  const url = '/.netlify/functions/changePassword';

  const body = {
    id: customerId,
    version,
    currentPassword,
    newPassword,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Password change failed:', errorText);
    throw new Error('Failed to change password: ' + errorText);
  }

  const data = await response.json();
  return data;
};
