import { useReducer } from "react";

export const ProductReducer = () => {
  const productsReducer = (state, action) => {
    switch (action.type) {
      case "SORT":
        return { ...state, sortBy: action.payload };
      case "INCLUDE_OUT_STOCK":
        return { ...state, includeOutOfStock: !state.includeOutOfStock };
      case "FAST_DELIVERY":
        return { ...state, fastDelivery: !state.fastDelivery };
      case "SORT_BY_PRICE_RANGE":
        return { ...state, priceRange: action.payload};
      case "CLEAR_ALL_FILTER":
        return { ...state, includeOutOfStock: true, fastDelivery: false, priceRange:null}  
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(productsReducer, {
    sortBy: null,
    includeOutOfStock: true,
    fastDelivery: false,
    priceRange:null
  });
  
  return { state, dispatch };
};
