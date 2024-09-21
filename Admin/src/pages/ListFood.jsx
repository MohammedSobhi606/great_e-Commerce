import axios from "axios";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function ListFood() {
  const [productlist, setproductlist] = useState([]);
  const { baseurl, token } = useSelector((store) => store.states);

  // useMemo to cache the get data function
  const GetData = useMemo(
    () => async () => {
      try {
        const response = await axios.get(`${baseurl}/api/product/list`);
        setproductlist(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [token, baseurl]
  );
  // fetch food list from API

  useEffect(() => {
    GetData();
  }, []);
  // remove food item from API
  const removeFood = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${baseurl}/api/product/remove/${id}`,
        {},
        {
          headers: { token },
        }
      );
      toast.success("Food removed successfully");
      setproductlist(res.data);
      GetData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="List w-full">
      <h1>Food List</h1>
      <div className="">
        <div className="bg-orange-500 grid grid-cols-[0.5fr_.5fr_.5fr]    md:grid-cols-[0.5fr_1fr_1fr_0.5fr_1.5fr]  justify-between  items-center gap-3 text-xl font-semibold rounded-t-lg p-2  ">
          <p>image</p>
          <p>Name</p>
          <p className=" hidden md:block ">Category </p>

          <p className=" hidden md:block ">Price</p>
          <p>actions</p>
        </div>
        {productlist.map((food, inx) => (
          <div
            className=" grid grid-cols-[0.5fr_.5fr_.5fr]   md:grid-cols-[0.5fr_1fr_1fr_0.5fr_1.5fr]  gap-3  justify-between border-separate border-b-2 items-center "
            key={inx}
          >
            <img src={food.image[0]} alt="" />
            <p className="font-bold">{food.name}</p>
            <p className="text-lg text-gray-600  hidden md:block  ">
              {food.category}
            </p>

            <p className="text-lg text-gray-600 hidden md:block  ">
              {food.price}
            </p>
            <div className="flex gap-3 ">
              <button className="px-3 py-2 active:scale-90 transition-all rounded-lg bg-blue-500 font-bold text-white">
                Edit
              </button>
              <button
                onClick={() => {
                  confirm("Are you sure you want to delete this product?");
                  removeFood(food._id);
                }}
                className="px-3 py-2 active:scale-90 transition-all rounded-lg bg-red-500 font-bold text-white "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListFood;
