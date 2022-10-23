import React, { useContext } from 'react'
import { CartContext } from '../../components/contexts/cart.context'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const { addItemToCart, removeCartToItem, clearCartToItem, totalCount } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>

        </div>
        <div className="header-block">
          <span>Price</span>

        </div>
        <div className="header-block">
          <span onClick={clearCartToItem}>Remove</span>

        </div>
      </div>

        {
          cartItems.map((cartItem) => {
            
            return (
              <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
            
          })
        }
        <span className="total">Total: ${totalCount}</span>
    </div>
  )
}

export default Checkout
