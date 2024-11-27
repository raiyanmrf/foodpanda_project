import { createContext, useState } from "react";

export const cartContext = createContext(null);

import React from "react";

export const CartContext = (props) => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState({
    restaurantID: null,
    items: [
      {
        item: null,
        no: null,
        total: null,
      },
    ],
  });

  const value = {
    isCartEmpty,
    setIsCartEmpty,

    showCart,
    setShowCart,

    cartItems,
    setCartItems,
  };
  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
};