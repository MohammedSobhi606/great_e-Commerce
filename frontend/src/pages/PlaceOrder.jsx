import React from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
function PlaceOrder() {
  const [itemselected, setItemselected] = useState(0);
  const navigate = useNavigate();

  const { products, baseurl, token, cartItems, isLoading } = useSelector(
    (state) => state.states
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const items = [];
    let price = 0;
    try {
      if (cartItems.length > 0) {
        cartItems.map((item) => {
          const data = products.find((p) => p._id === item.productId);

          items.push({
            product_id: data._id,
            amount: cartItems.length,
            product_name: data.name,
            size: item.size,
            quantity: item.quantity,
            price: data.price,
            image: data.image,
          });
          price = data.price * cartItems.length;
        });
      }

      //  Send order to server with items and user data
      let orderData = {
        items,
        amount: price,
        address: formData,
      };
      // Send order to server with items and user data
      switch (itemselected) {
        case 0:
          try {
            const res = await axios.post(
              `${baseurl}/api/order/place`,
              orderData,
              {
                headers: { token },
              }
            );
            toast.success(res.data.message);
            navigate("/orders");
          } catch (error) {
            console.log(error);
          }
          break;
        case 1:
          // Payment gateway integration here stripe
          try {
            const res = await axios.post(
              `${baseurl}/api/order/stripe`,
              orderData,
              {
                headers: { token },
              }
            );
            const { session_url } = res.data;
            window.location.assign(session_url);
            toast.success(res.data.message);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* =====Left side ========= */}

      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl mt-3">
          <Title text1={"delivery"} text2={"information"} />
        </div>
        {/* inputs */}
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstname"
            type="text"
            placeholder="First name"
            className="border-2 p-2 w-full border-gray-300 outline-none focus:ring-1 ring-blue-500  rounded"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border-2 p-2 w-full  border-gray-300 outline-none focus:ring-1 ring-blue-500 rounded"
            onChange={onChangeHandler}
            name="lastname"
          />
        </div>
        <input
          type="email"
          required
          placeholder="email address"
          className="border-2 p-2 w-full rounded  border-gray-300 outline-none focus:ring-1 ring-blue-500 "
          onChange={onChangeHandler}
          name="email"
        />
        <input
          type="text"
          required
          placeholder="street"
          className="border-2 p-2 w-full rounded  border-gray-300 outline-none focus:ring-1 ring-blue-500 "
          onChange={onChangeHandler}
          name="street"
        />
        <div className="flex gap-3">
          <input
            type="text"
            required
            placeholder="City"
            className="border-2 p-2 w-full border-gray-300 outline-none focus:ring-1 ring-blue-500  rounded"
            onChange={onChangeHandler}
            name="city"
          />
          <input
            type="text"
            required
            placeholder="State"
            className="border-2 p-2 w-full  border-gray-300 outline-none focus:ring-1 ring-blue-500 rounded"
            onChange={onChangeHandler}
            name="state"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="zipcode"
            className="border-2 p-2 w-full border-gray-300 outline-none focus:ring-1 ring-blue-500  rounded"
            onChange={onChangeHandler}
            name="zipcode"
          />
          <input
            type="text"
            placeholder="Country"
            className="border-2 p-2 w-full  border-gray-300 outline-none focus:ring-1 ring-blue-500 rounded"
            onChange={onChangeHandler}
            name="country"
          />
        </div>
        <input
          type="number"
          placeholder="phone"
          className="border-2 p-2 w-full rounded  border-gray-300 outline-none focus:ring-1 ring-blue-300 "
          onChange={onChangeHandler}
          name="phone"
        />
      </div>
      {/* =====right side ========= */}
      <div className="mt-8 ">
        <div className="min-w-70">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={"payment"} text2={"method"} />
        </div>
        {/* payment methods */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div
            onClick={() => setItemselected(1)}
            className="flex items-center gap-3 cursor-pointer border px-3 py-2"
          >
            <span
              className={`rounded-full h-3.5 min-w-3.5 border ${
                itemselected === 1 ? "bg-green-500" : ""
              }`}
            ></span>
            <img src={assets.stripe_logo} alt="" className="mx-5 h-5" />
          </div>
          <div
            onClick={() => setItemselected(2)}
            className="flex items-center gap-3 cursor-pointer border px-3 py-2"
          >
            <span
              className={`rounded-full h-3.5 min-w-3.5 border ${
                itemselected === 2 ? "bg-green-500" : ""
              }`}
            ></span>
            <img src={assets.razorpay_logo} alt="" className="mx-5 h-5 " />
          </div>
          <div
            onClick={() => setItemselected(0)}
            className="flex items-center gap-3 cursor-pointer border px-3 py-2"
          >
            <span
              className={`rounded-full h-3.5 min-w-3.5 border ${
                itemselected === 0 ? "bg-green-500" : ""
              }`}
            ></span>
            <p className="text-gray-600 font-bold">Cash On Delivery</p>
          </div>
        </div>{" "}
        <div className=" mt-4  w-full text-end ">
          <button
            type="submit"
            className=" bg-black text-white py-2 px-12 uppercase mt-8   font-bold rounded-sm "
          >
            {isLoading ? "Loading..." : "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
