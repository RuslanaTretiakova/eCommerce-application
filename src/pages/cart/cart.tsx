import { Link } from 'react-router-dom';

// import cart from '../../../assets/img/header/cart.svg';
import cartIcon from '../../assets/img/header/cart.svg';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Cart } from '../../types/cartTypes';
import { useAuth } from '../../api/authorithation/AuthToken';

import './cart.scss';

function Cart() {
  const { cartId } = useParams<{ cartId: string }>();
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
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/.netlify/functions/getCart?cartId=${cartId}`, {
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
  }, [cartId, token]);

  console.log('cartId:', cartId);
  console.log('Cart:', cart);
  console.log('Line Items:', cart?.lineItems);

  // if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">
        <img src={cartIcon} alt="cart-image" />
      </div>

      <h2 className="empty-cart-title">Your cart is empty</h2>
      <p className="empty-cart-text">Looks like you have not added anything to your cart yet</p>
      <Link to="/products/all" className="continue-shopping">
        Continue shopping
      </Link>
    </div>
  );
  // }

  // if (cart) {
  //   const totalPrice = (cart.totalPrice.centAmount / 100).toFixed(2);

  //   const items = cart.lineItems.map((item) => {
  //     const price = item.price;
  //     return {
  //       name: item.name['en-US'],
  //       img: item.variant.images?.[0]?.url || '',
  //       quantity: item.quantity,
  //       originalPrice: price.value.centAmount / 100,
  //       discountedPrice: price.discounted?.value.centAmount
  //         ? price.discounted.value.centAmount / 100
  //         : price.value.centAmount / 100,
  //       variant: {
  //         sku: item.variant.sku,
  //       },
  //     };
  //   });

  //   return (
  //     <div className="temp">
  //       <h1>Cart page</h1>
  //       <div className="cart-container">
  //         <div className="cart-products">
  //           <button type="button" className="remove-all-btn">
  //             Remove all items
  //           </button>

  //           {items.map((item: ParsedCartItem) => (
  //             <div className="cart-product" key={item.variant.sku}>
  //               <img src={item.img} alt="product" className="cart-product__image" />
  //               <div className="cart-product__details">
  //                 <h3>{item.name}</h3>
  //                 <p className="cart-product__price">{`${item.discountedPrice} EURO`}</p>
  //                 <p className="cart-product__original">{`${item.originalPrice} EURO`}</p>
  //                 <div className="cart-product__actions">
  //                   <div className="quantity-control">
  //                     <button className="quantity-btn" type="button">
  //                       -
  //                     </button>
  //                     <input
  //                       type="text"
  //                       className="quantity-input"
  //                       value={item.quantity}
  //                       aria-label="Quantity"
  //                     />
  //                     <button className="quantity-btn" type="button">
  //                       +
  //                     </button>
  //                   </div>
  //                   <button className="remove-btn" type="button">
  //                     Delete
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         <div className="cart-summary">
  //           <h3 className="summary-title">Summury</h3>
  //           <div className="summary-row">
  //             <p>Total with TAX: </p>
  //             <p>{`${totalPrice} EURO`}</p>
  //           </div>
  //           <div className="summary-row summary-total">
  //             <p>Total with promocode: </p>
  //             <p>400 EURO</p>
  //           </div>
  //           <button className="checkout-btn" type="button">
  //             Check in
  //           </button>
  //           <Link to="/products/all" className="continue-shopping">
  //             Continue shopping
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Cart;
