import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCartAction } from "../actions/cartAction";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const num = 4;
  const dispatch = useDispatch();
  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  React.useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }

    return () => {};
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping cART</h3>
            <div>Price</div>
          </li>

          {cartItems && cartItems.length === 0 ? (
            <div>CART IS EMPTY</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>

                <div className="cart-name">
                  <Link to={"/product/" + item.product}>
                    <div>{item.name}</div>
                  </Link>

                  <div>
                    QTY:
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        e.preventDefault();
                        console.log(item.product);
                        return dispatch(
                          addToCart(item.product, e.target.value)
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => removeFromCart(item.product)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                </div>
                <div className="cart-price">{item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          SubTotal (
          {cartItems[0] &&
            cartItems.reduce((a, c) => {
              return a + c.qty;
            }, 0)}{" "}
          items) : ${" "}
          {cartItems.length > 0 &&
            cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkOutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
