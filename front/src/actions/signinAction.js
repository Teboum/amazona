import Axios from "axios";

import Cookie from "js-cookie";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstents";

export const signin = (email, password) => async (dispatch) => {
  console.log(email, password);
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const req = await Axios.post("/api/users/signin", { email, password });
    console.log(req);
    const { data } = req;
    console.log();
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: err.message });
  }
};
export const register = (name, email, password) => async (dispatch) => {
  console.log(email, password);
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.message });
  }
};
