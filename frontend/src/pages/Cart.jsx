import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import { removeFromCart, updateQuantity } from "../Store/States";
import CartTotal from "../Components/CartTotal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Cart() {
  const { cartItems, cartCount, products, baseurl, token } = useSelector(
    (store) => store.states
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateQuantityDb = ({ productId, quantity, size }) => {
    axios
      .post(
        `${baseurl}/api/cart/update`,
        { productId, quantity, size },
        { headers: { token } }
      )
      .then((res) => {
        dispatch(updateQuantity(res.data.data));
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  const removeFromCartDb = ({ productId, size }) => {
    axios
      .post(
        `${baseurl}/api/cart/remove`,
        { productId, size },
        { headers: { token } }
      )
      .then((res) => {
        dispatch(updateQuantity(res.data.data));
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="pt-14 border-t">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {/* cart items */}
      <div>
        {cartItems.map((item, ix) => {
          const product = products.find((p) => p._id === item.productId);
          return (
            <div
              key={ix}
              className="py-4 border-b border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-cover rounded-md"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div>
                  <h3 className="text-sm sm:text-xl font-medium">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${product.name}</p>
                    <p className="bg-slate-100 border px-2 ">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  updateQuantityDb({
                    quantity: Number(e.target.value),
                    productId: item.productId,
                    size: item.size,
                  })
                }
                className="border max-w-10 px-1 sm:max-w-20 sm:px-2 py-1 rounded-md  outline-none   focus:ring-1 focus:ring-indigo-400 "
              />
              <div
                onClick={() =>
                  removeFromCartDb({
                    productId: item.productId,
                    size: item.size,
                  })
                }
                className="hover:bg-red-400 cursor-pointer w-14 content-center p-4 rounded-full"
              >
                <img
                  src={assets.bin_icon}
                  className=" w-4 sm:w-5 mr-4"
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20 ">
        <div className=" w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place_order")}
              className="py-2 px-4 my-8 bg-black text-white rounded-sm shadow-lg shadow-black -translate-y-1 ease-in-out duration-100 active:shadow-sm active:translate-y-0"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
