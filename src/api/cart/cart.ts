type CreateCartResponse = {
  id: string;
  version: number;
};

export async function createCart(
  accessToken: string,
  isAnonymous: boolean,
  anonymousId?: string,
): Promise<CreateCartResponse | null> {
  try {
    const res = await fetch('/.netlify/functions/createCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, isAnonymous, anonymousId }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Create cart error:', data);
      return null;
    }

    if (!data?.id || typeof data.version !== 'number') {
      console.warn('Unexpected cart format:', data);
      return null;
    }

    return { id: data.id, version: data.version };
  } catch (error) {
    console.error('Create cart failed:', error);
    return null;
  }
}
