import { useEffect, useState } from "react";
import React from "react";
import Title from "../Components/Title";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Orders() {
  const { baseurl, token } = useSelector((state) => state.states);

  const [orders, setorders] = useState([]);
  // fetch orders from server
  const loadOrdersFromServer = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/order/Order_list_user`,

        { headers: { token: token } }
      );
      const singleOrder = response.data.orders.map((order) => order);
      setorders(singleOrder.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrdersFromServer();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"my"} text2={"orders"} />
      </div>
      {/* order list */}
      <div>
        {orders.map(
          (order, index) => {
            return (
              <>
                <h1 key={index}>{order.address.firstname}</h1>

                {order.items.map((item, ix) => (
                  <div
                    key={ix}
                    className="flex border-t border-b py-4 justify-between items-center"
                  >
                    <div key={index} className=" text-gray-700 flex flex-col">
                      <div className="flex items-start gap-6 text-sm">
                        <img
                          className="w-16 object-cover rounded-md"
                          src={item.image[0]}
                          alt={item.name}
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600">
                            Status: {order.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            quantity: {item.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">size: {item.size}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">price: {item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 ">
                      <button className="px-4 py-2 border text-sm font-bold text-gray-600 ">
                        ready to go !
                      </button>
                    </div>
                  </div>
                ))}
              </>
            );
          }
          //
        )}
        {orders.length === 0 && <h1>No orders found</h1>}
      </div>
    </div>
  );
}

export default Orders;
