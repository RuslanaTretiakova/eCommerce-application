async function getSortedProductListAllFromServer(sortAttr: string) {
  const response = await fetch(
    `/.netlify/functions/getSortedAllProductList?&sort=${encodeURIComponent(sortAttr)}`,
  );

  console.log(sortAttr);

  if (!response.ok) {
    const text = await response.text();
    console.error('Server error:', text);
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default getSortedProductListAllFromServer;
