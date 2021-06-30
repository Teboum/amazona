import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCartAction } from "../actions/cartAction";
import CheckOutSteps from "../components/checkOutSteps";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  console.log(cartItems);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();
  if (!payment.paymentMethod) {
    props.history.push("/payment");
  } else if (!shipping.adress) {
    props.history.push("/shipping");
  }

  const placeOrderHandler = () => {
    //create an order
  };

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            {cart.shipping && (
              <div>
                {cart.shipping.adress},{cart.shipping.city},
                {cart.shipping.postalCode},{cart.shipping.country}
              </div>
            )}
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method:{cart.payment.paymentMethod}</div>
          </div>
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

                    <div>QTY:{item.qty}</div>
                  </div>
                  <div className="cart-price">{item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                onClick={placeOrderHandler}
                className="button primary full-width"
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>items </div>
              <div>${itemsPrice} </div>
            </li>
            <li>
              <div>Shipping </div>
              <div>${shippingPrice} </div>
            </li>
            <li>
              <div>Tax </div>
              <div>${taxPrice} </div>
            </li>
            <li>
              <div>Order Total </div>
              <div>${totalPrice} </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
