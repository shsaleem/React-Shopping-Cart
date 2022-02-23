import React from "react";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === "INCREMENT") {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: newCart,
    };
  }

  if (action.type === "DECREMENT") {
    const newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
      .filter((item) => item.amount >= 1);

    return {
      ...state,
      cart: newCart,
    };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, item) => {
        const { price, amount } = item;
        cartTotal.total += price * amount;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === "GET_CART") {
    return {
      ...state,
      loading: false,
      cart: action.payload,
    };
  }

  throw new Error("No matching action type");
};

export default reducer;
