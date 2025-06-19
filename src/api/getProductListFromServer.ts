async function getProductListFromServer() {
  const response = await fetch(`/.netlify/functions/getProductList`);
  const data = await response.json();
  return data;
}

export default getProductListFromServer;
