export const fetchActiveAnonCart = async (token: string) => {
  const response = await fetch('/.netlify/functions/getActiveAnonCart', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }

  return null;
};
