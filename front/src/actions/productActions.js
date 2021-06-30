import Axios from "axios";
import axios from "axios";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      console.log("save1");
      const { data } = await Axios.post("/api/products", product);
      console.log(data);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      console.log("save2");
      const { data } = await Axios.put("/api/products/" + product._id, product);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (id) => async (dispatch) => {
  console.log("hello");
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
    const { data } = await axios.get("/api/products/" + id);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  console.log("hello");
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
    const { data } = await axios.delete("/api/products/" + id);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (err) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.message });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };
