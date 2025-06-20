import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Cart, ParsedCartItem } from '../../../types/cartTypes';
import ConfirmationPrompt from '../../cart/confirmationPrompt/confirmationPromt';

interface CartWithItemsProps {
  cart: Cart;
  handleClearCart: () => void;
}

function CartWithItems({ cart, handleClearCart }: CartWithItemsProps) {
  const totalPrice = (cart.totalPrice.centAmount / 100).toFixed(2);
  const [quantityProducts, SetQuantityProducts] = useState(1);

  const handleChangeQuantityProducts = (event:  React.MouseEvent<HTMLButtonElement>) => {
    const clickedButton = event?.currentTarget;
    console.log(clickedButton?.id)
    console.log('change')
    if(clickedButton.id === 'increaseQuantity'){
      let quantity = quantityProducts;
      SetQuantityProducts(quantity += 1)
    } 

    if(clickedButton.id === 'decreaseQuantity' && quantityProducts > 1){
       let quantity = quantityProducts;
      SetQuantityProducts(quantity -= 1)
    }
  }

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

          {items.map((item: ParsedCartItem) => (
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
                    <button className="quantity-btn" type="button" id="decreaseQuantity" onClick={handleChangeQuantityProducts}>
                      -
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      value={quantityProducts}
                      aria-label="Quantity"
                      readOnly
                    />
                    <button className="quantity-btn" type="button" id="increaseQuantity" onClick={handleChangeQuantityProducts}>
                      +
                    </button>
                  </div>
                  <button id="remove-btn" type="button">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* confirmation mode */}
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
