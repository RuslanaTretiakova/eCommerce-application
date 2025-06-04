async function getSearchProductListFromServer(textSearch: string) {
  const response = await fetch(
    `/.netlify/functions/getFilterProductList?q=${encodeURIComponent(textSearch)}`,
  );

  console.log('Raw response:', response);

  if (!response.ok) {
    const text = await response.text(); // Read raw HTML
    console.error('Server error:', text);
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json(); // Only try to parse JSON if response is OK
  console.log(data);
  return data;
}

export default getSearchProductListFromServer;
