import React from "react";

function CheckOutSteps(props) {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? "active" : ""}>Signin</div>
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payement</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}

export default CheckOutSteps;
