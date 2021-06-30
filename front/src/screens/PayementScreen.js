import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { savePayment } from "../actions/cartAction";

import CheckOutSteps from "../components/checkOutSteps";

function PayementScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder");
  }

  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value="paypal"
                />
                <label htmlFor="adress">Paypal</label>
              </div>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default PayementScreen;
