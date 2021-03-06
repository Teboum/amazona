import Cookie from "js-cookie";
import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  REMOVE_FROM_CART,
} from "../constants/cartConstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    id: id,
  });
  const { cart: cartItems } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};
export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
