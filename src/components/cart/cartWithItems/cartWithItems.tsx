import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Cart, ParsedCartItem } from '../../../types/cartTypes';

import PromoCode from '../promoCode/promocode';
import ConfirmationPrompt from '../../cart/confirmationPrompt/confirmationPromt';
import { useAuth } from '../../../api/authorithation/AuthToken';
import changeProductQuantityFromServer from '../../../api/cart/changeProductQuantity';
import { removeFromCartClient } from '../../../api/cart/removeFromCartClient';

interface CartWithItemsProps {
  cart: Cart;
  handleClearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string | null;
  handleApplyPromoCode: () => void;
}

function CartWithItems({
  cart: InitialCart,
  handleClearCart,
  promoCode,
  setPromoCode,
  promoError,
  handleApplyPromoCode,
}: CartWithItemsProps) {
  const [cart, setCart] = useState(InitialCart);
  const totalPrice = (cart.totalPrice.centAmount / 100).toFixed(2);
  const { token } = useAuth();
  const [quantityMap, setQuantityMap] = useState<{ [sku: string]: number }>({});
  const [showModal, setShowModal] = useState(false);

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

  const handleRemoveProduct = async (sku: string) => {
    const product = cart.lineItems.find((item) => item.variant.sku === sku);
    if (!token || !product) return;

    try {
      const updatedCart = await removeFromCartClient({
        token,
        cartId: cart.id,
        version: cart.version,
        lineItemId: product.id,
      });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove product:', error);
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
                    <button id="remove-btn" type="button" onClick={() => handleRemoveProduct(sku)}>
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

          {/* {cart.discountOnTotalPrice && (
            <div className="cart-discount-info">
              <p>
                Discount:
                <strong>
                  {(cart.discountOnTotalPrice.discountedAmount.centAmount / 100).toFixed(2)}
                </strong>
              </p>
            </div>
          )} */}

          {/* <div className="cart-total-info">
            <p>
              Total after discount:
              <strong>
                {(
                  (cart.totalPrice.centAmount -
                    (cart.discountOnTotalPrice?.discountedAmount.centAmount ?? 0)) /
                  100
                ).toFixed(2)}
                {cart.totalPrice.currencyCode}
              </strong>
            </p>
          </div> */}

          <PromoCode
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            promoError={promoError}
            handleApplyPromoCode={handleApplyPromoCode}
          />

          <div className="summary-row summary-total">
            <p>Total with promocode: </p>
            <p>{`${totalPrice} EURO`}</p>
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
