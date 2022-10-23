import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

  // function to check if this item already exists in the cart using id
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id 
  );

  //if that exists increase the quantity else return as it is 
  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    )}
  
  //if it does'nt exist create new item with quantity 1. 
  return [...cartItems, {...productToAdd, quantity: 1}];
}

///////
const removeCartItem = (cartItems, cartItemToRemove) => {
  
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id 
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }


  return cartItems.map((cartItem) => 
      cartItem.id === cartItemToRemove.id 
      ? {...cartItem, quantity: cartItem.quantity - 1} 
      : cartItem
    );

}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartIems: [],
  cartCount: 0,
  addItemToCart: () => {},
  removeCartItem: () => {},
  clearCartItem: () => {},
  total: 0
})

export const CartProvider = ({children}) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  
  
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  },[cartItems]);

  useEffect(() => {
    const newTotalCount = cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.quantity * cartItem.price, 0);
    setTotalCount(newTotalCount);
  },[cartItems]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeCartToItem = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearCartToItem = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeCartToItem, clearCartToItem, totalCount};
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}