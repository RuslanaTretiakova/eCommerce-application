import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Cart, ParsedCartItem } from '../../types/cartTypes';
import { useAuth } from '../../api/authorithation/AuthToken';

import './cart.scss';

function Cart() {
  // const { cart, loading } = useCart();
  const { token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // if (loading) return <p>Loading card...</p>;
  if (error) {
    if (loading) return <p>Loading card...</p>;
    return <p className="error-message">{error}</p>;
  }

  useEffect(() => {
    async function fetchCart() {
      debugger;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/.netlify/functions/getCart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const text = await res.text();

        try {
          const data = JSON.parse(text);
          setCart(data);
        } catch (err: unknown) {
          console.error('JSON parse error:', err);
          // console.warn('Response was:', text);
          throw new Error('Invalid JSON from server');
        }
      } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) errorMessage = error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchCart();
    }
  }, [token]);

  console.log('Cart:', cart);
  console.log('Line Items:', cart?.lineItems);

  if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
    return <p>Empty cart</p>;
  }

  if (cart) {
    const items = cart.lineItems.map((item) => {
      const price = item.price;
      return {
        name: item.name['en-US'],
        img: item.variant.images?.[0]?.url || '',
        quantity: item.quantity,
        originalPrice: price.value.centAmount / 100,
        discountedPrice: price.discounted?.value.centAmount
          ? price.discounted.value.centAmount / 100
          : price.value.centAmount / 100,
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
              <div className="cart-product" key={item.variant.sku}>
                <img src={item.img} alt="product" className="cart-product__image" />
                <div className="cart-product__details">
                  <h3>{item.name}</h3>
                  <p className="cart-product__price">{`${item.discountedPrice} EURO`}</p>
                  <p className="cart-product__original">{`${item.originalPrice} EURO`}</p>
                  <div className="cart-product__actions">
                    <div className="quantity-control">
                      <button className="quantity-btn" type="button">
                        -
                      </button>
                      <input type="text" className="quantity-input" value={item.quantity} />
                      <button className="quantity-btn" type="button">
                        +
                      </button>
                    </div>
                    <button className="remove-btn" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Summury</h3>
            <div className="summary-row">
              <span>Total: </span>
              <span>498 EURO</span>
            </div>
            <div className="summary-row summary-total">
              <span>Final total with discount: </span>
              <span>498 EURO</span>
            </div>
            <button className="checkout-btn" type="button">
              Check in
            </button>
            <Link to="/products/all" className="continue-shopping">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
