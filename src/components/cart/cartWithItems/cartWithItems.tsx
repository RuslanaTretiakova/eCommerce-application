import { Link } from 'react-router-dom';
import type { Cart, ParsedCartItem } from '../../../types/cartTypes';

interface CartWithItemsProps {
  cart: Cart;
}

function CartWithItems({ cart }: CartWithItemsProps) {
  const totalPrice = (cart.totalPrice.centAmount / 100).toFixed(2);

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

  return (
    <div className="temp">
      <h1>Cart page</h1>
      <div className="cart-container">
        <div className="cart-products">
          <button type="button" className="remove-all-btn">
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
                    <button className="quantity-btn" type="button" id="decreaseQuantity">
                      -
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      value={item.quantity}
                      aria-label="Quantity"
                      readOnly
                    />
                    <button className="quantity-btn" type="button" id="increaseQuantity">
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
