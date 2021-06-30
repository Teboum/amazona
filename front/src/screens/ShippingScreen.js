import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { saveShipping } from "../actions/cartAction";

import CheckOutSteps from "../components/checkOutSteps";

function ShippingScreen(props) {
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShipping({ adress, city, postalCode, country }));
    props.history.push("/payment");
  }

  return (
    <div>
      <CheckOutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="adress">Adress</label>
              <input
                type="text"
                name="adress"
                id="adress"
                onChange={(e) => setAdress(e.target.value)}
                value={adress}
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </li>
            <li>
              <label htmlFor="popostalCodestal">Postal</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
              />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
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

export default ShippingScreen;
