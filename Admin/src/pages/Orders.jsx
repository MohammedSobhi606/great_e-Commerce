import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function Orders() {
  const [Orders, setOrders] = useState([]);

  const { baseurl, token } = useSelector((state) => state.states);
  // get all orders

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
       ` https://great-e-commerce.vercel.app/api/order/Order_list_admin`
      );
      const order = response.data.orders;
      setOrders(order);
    } catch (error) {
      console.error(error);
    }
  };
  // change order status
  const changeOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        "https://great-e-commerce.vercel.app/order/update_status",
        { status, orderId },
        { headers: { token } }
      );
      toast.success(response.data.message);
      getAllOrders();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  
  return (
    <div>
      <h1>Order Page</h1>
      <div className="flex flex-col gap-12">
        {Orders.map((order, ix) => (
          <div
            key={ix}
            className="grid justify-around items-start border p-5 w-full gap-4 grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[1fr_2fr_2fr_1fr_1fr]"
          >
            <img src={assets.parcel_icon} alt="" />
            <div>
              {order.items.map((item, ix) => {
                if (ix === order.length - 1) {
                  return (
                    <p key={ix} className="m-2 p-2 bg-slate-200 rounded-lg">
                      {item.product_name} x {item.quantity}
                    </p>
                  );
                } else {
                  return (
                    <p key={ix} className="m-2 p-2 bg-slate-200 rounded-lg">
                      {item.product_name} x {item.quantity}
                      <span>{item.size}</span>
                    </p>
                  );
                }
              })}

              <p className="m-2 p-2 bg-purple-200 rounded-lg">
                Name:{order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="m-2 p-2 grid gap-0 bg-slate-200 rounded-lg">
                <p className="m-1 p-2 bg-pink-200 rounded-lg">
                  Address: {order.address.street}
                </p>
                <p className="m-1 p-2 bg-pink-200 rounded-lg">
                  {" "}
                  City:{order.address.city}
                </p>
              </div>
              <p className="m-2 p-2 bg-yellow-200 rounded-lg font-bold">
                Phone: {order.address.phone}
              </p>
            </div>
            <div className="m-2 p-2 grid gap-0 bg-slate-200 rounded-lg">
              <p className="m-2 p-2 bg-yellow-200 rounded-lg font-bold">
                Items: {order.items.length}
              </p>
              <p className="m-2 p-2 bg-yellow-200 rounded-lg font-bold">
                Status: {order.status}
              </p>

              <p className="m-2 p-2 bg-yellow-200 rounded-lg font-bold">
                {" "}
                Payment Method: {order.paymentMethode}
              </p>
              <p className="m-2 p-2 bg-red-200 rounded-lg font-bold">
                Order Date: {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <p className="m-2 p-2 bg-lime-200 rounded-lg font-bold">
              ${order.amount}
            </p>
            <select
              value={order.status}
              onChange={(e) => changeOrderStatus(order._id, e.target.value)}
              className="border px-3 bg-slate-200 py-1 rounded-md"
            >
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Shipped">Shipped</option>
              <option value="Returned">Returned</option>
              <option value="Processing">Processing</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
