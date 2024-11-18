import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrde.css";
import { StoreContex } from "../../Context/StoreContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlaceOrde() {
  const { getTotalCartAmount, food_list, cartItem, url, token } =
    useContext(StoreContex);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandeler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Create orderItems based on cart items and quantities
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item }; // Make a copy of the item
        itemInfo.quantity = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 80,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Correct usage: window.location.replace()
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log("Error placing order:", error);
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");

      toast.success("Almost there! ");
      toast.success("Please log in to place your order!");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast.success("Add Some Food on Your Cart!");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeorder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input
              required
              name="firstName"
              onChange={onChangeHandeler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandeler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandeler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            onChange={onChangeHandeler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          <div className="multi-field">
            <input
              required
              name="city"
              onChange={onChangeHandeler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandeler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-field">
            <input
              required
              name="zipCode"
              onChange={onChangeHandeler}
              value={data.zipCode}
              type="text"
              placeholder="Zip code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandeler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandeler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="card-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 80}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}
              </p>
            </div>
          </div>
          <button type="submit" className="buttoncheckout">
            Pay With Stripe
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrde;
