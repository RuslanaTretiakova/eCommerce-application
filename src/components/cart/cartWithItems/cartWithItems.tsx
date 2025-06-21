import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Cart, ParsedCartItem } from '../../../types/cartTypes';
import ConfirmationPrompt from '../../cart/confirmationPrompt/confirmationPromt';
import { useAuth } from '../../../api/authorithation/AuthToken';
import changeProductQuantityFromServer from '../../../api/cart/changeProductQuantity';

interface CartWithItemsProps {
  cart: Cart;
  handleClearCart: () => void;
}

function CartWithItems({ cart: InitialCart, handleClearCart }: CartWithItemsProps) {
  const [cart, setCart] = useState(InitialCart);
  const totalPrice = (cart.totalPrice.centAmount / 100).toFixed(2);
  const { token } = useAuth();
  const [quantityMap, setQuantityMap] = useState<{ [sku: string]: number }>({});

  const handleChangeQuantityProducts = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sku: string,
  ) => {
    const clickedButton = event.currentTarget;
    const currentProduct = cart.lineItems.find((item) => item.variant.sku === sku);
    if (!currentProduct) return;

    const currentQuantity = quantityMap[sku] ?? currentProduct.quantity;
    let newQuantity = currentQuantity;

    if (clickedButton.id === 'increaseQuantity') {
      newQuantity += 1;
    }

    if (clickedButton.id === 'decreaseQuantity' && currentQuantity > 1) {
      newQuantity -= 1;
    }

    setQuantityMap((prev) => ({ ...prev, [sku]: newQuantity }));

    if (token) {
      try {
        const updatedCart = await changeProductQuantityFromServer({
          itemId: currentProduct.id,
          cartId: cart.id,
          version: cart.version,
          newQuantity,
          token,
        });
        setCart(updatedCart);
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    }
  };

  const items = cart.lineItems.map((item) => {
    const price = item.price;
    return {
      name: item.name['en-US'],
      img: item.variant.images?.[0]?.url || '',
      quantity: item.quantity,
      originalPrice: price.value.centAmount / 100,
      discountedPrice: price.discounted?.value.centAmount
        ? price.discounted.value.centAmount / 100
        : undefined,
      variant: {
        sku: item.variant.sku,
      },
    };
  });

  const [showModal, setShowModal] = useState(false);
  const confirmClear = () => {
    handleClearCart();
    setShowModal(false);
  };

  return (
    <div className="temp">
      <h1>Cart page</h1>
      <div className="cart-container">
        <div className="cart-products">
          <button type="button" className="remove-all-btn" onClick={() => setShowModal(true)}>
            Remove all items
          </button>

          {items.map((item: ParsedCartItem) => {
            let sku = item.variant.sku;
            return (
              <div className="cart-product" data-sku={item.variant.sku} key={item.variant.sku}>
                <img src={item.img} alt="product" className="cart-product__image" />
                <div className="cart-product__details">
                  <h3>{item.name}</h3>
                  {item.discountedPrice ? (
                    <>
                      <p className="cart-product__price">{`${item.discountedPrice} EURO`}</p>
                      <p className="cart-product__original">{`${item.originalPrice} EURO`}</p>
                    </>
                  ) : (
                    <p className="cart-product__price">{`${item.originalPrice} EURO`}</p>
                  )}
                  <div className="cart-product__actions">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        type="button"
                        id="decreaseQuantity"
                        onClick={(e) => {
                          handleChangeQuantityProducts(e, sku);
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="quantity-input"
                        value={quantityMap[sku] ?? item.quantity}
                        aria-label="Quantity"
                        readOnly
                      />
                      <button
                        className="quantity-btn"
                        type="button"
                        id="increaseQuantity"
                        onClick={(e) => {
                          handleChangeQuantityProducts(e, sku);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button id="remove-btn" type="button">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {showModal && (
            <ConfirmationPrompt onConfirm={confirmClear} onCancel={() => setShowModal(false)} />
          )}
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Summury</h3>
          <div className="summary-row">
            <p>Total with TAX: </p>
            <p>{`${totalPrice} EURO`}</p>
          </div>
          <div className="summary-row summary-total">
            <p>Total with promocode: </p>
            <p>400 EURO</p>
          </div>
          <button className="checkout-btn" type="button">
            Check in
          </button>
          <Link to="/products" className="continue-shopping">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartWithItems;
