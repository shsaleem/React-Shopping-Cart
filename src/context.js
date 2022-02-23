import React, { useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispacth] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispacth({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispacth({ type: "REMOVE_ITEM", payload: id });
  };

  const increment = (id) => {
    dispacth({ type: "INCREMENT", payload: id });
  };

  const decrement = (id) => {
    dispacth({ type: "DECREMENT", payload: id });
  };

  useEffect(() => {
    dispacth({ type: "LOADING" });

    const fetchData = async () => {
      const response = await fetch(url);
      const cartData = await response.json();
      dispacth({ type: "GET_CART", payload: cartData });
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispacth({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increment,
        decrement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
