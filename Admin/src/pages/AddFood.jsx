import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../Store/States";
function AddFood() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [sub_category, setSub_category] = useState("Bottomwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { baseurl, token, isLoading } = useSelector((store) => store.states);
  const dispatch = useDispatch();

  const formhandeler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("category", category);
    formData.append("sub_category", sub_category);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller);
    formData.append("quantity", quantity);
    // send data to server here
    try {
      dispatch(setIsLoading(true));
      const response = await axios.post(
        `${baseurl}/api/product/add`,
        formData,
        { headers: { token } }
      );
      dispatch(setIsLoading(false));
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setIsLoading(false));
  };
  return (
    <div className="add w-[100%] md:w-[70%] ml-[5vw] mt-4">
      <form onSubmit={formhandeler} className="flex flex-col gap-2.5">
        <div className="add_img_up flex flex-col ">
          <p className="text-xl font-bold">upload image:</p>
          <div className="flex flex-col  sm:flex-row gap-4">
            <label htmlFor="image1">
              <img
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                className="w-[80%] sm:w-32 h-32 object-contain hover:border-8 border-dashed ease-in-out duration-100 border-indigo-300 rounded-lg cursor-pointer"
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              id="image1"
              type="file"
              accept="image/*"
              hidden
            />
            <label htmlFor="image2">
              <img
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                className="w-[80%] sm:w-32 h-32 object-contain hover:border-8 border-dashed ease-in-out duration-100 border-indigo-300 rounded-lg cursor-pointer"
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              id="image2"
              type="file"
              accept="image/*"
              hidden
            />
            <label htmlFor="image3">
              <img
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                className="w-[80%] sm:w-32 h-32 object-contain hover:border-8 border-dashed ease-in-out duration-100 border-indigo-300 rounded-lg cursor-pointer"
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              id="image3"
              type="file"
              accept="image/*"
              hidden
            />
            <label htmlFor="image4">
              <img
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                className="w-[80%] sm:w-32 h-32 object-contain hover:border-8 border-dashed ease-in-out duration-100 border-indigo-300 rounded-lg cursor-pointer"
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              id="image4"
              type="file"
              accept="image/*"
              hidden
            />
          </div>
        </div>
        <div className="add_input_name flex flex-col gap-2">
          <p className="text-xl font-bold text-gray-600">Product Name:</p>
          <input
            className="font-bold px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
            type="text"
            placeholder="Name"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </div>
        <div className="add_input_description flex flex-col gap-2">
          <p className="text-xl font-bold text-gray-600">Description:</p>
          <textarea
            className="font-bold px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
            placeholder="Description"
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
          />
        </div>
        <div className=" flex  gap-4 sm:flex-nowrap flex-wrap ">
          <div className="category w-full">
            <p className="text-xl font-bold text-gray-600">Category:</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              value={category}
              className="font-bold  w-full  px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
            >
              <option value="Men">Men </option>
              <option value="Women">Women </option>
              <option value="Kids"> Kids</option>
            </select>
          </div>
          <div className="sub_category w-full">
            <p className="text-xl font-bold text-gray-600">sub_sategory:</p>
            <select
              onChange={(e) => setSub_category(e.target.value)}
              value={sub_category}
              className=" w-full font-bold px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
            >
              <option value="Topwear">Topwear </option>
              <option value="Bottomwear">Bottomwear </option>
              <option value="winterwear"> winterwear</option>
            </select>
          </div>
        </div>{" "}
        <div className="flex justify-between sm:flex-nowrap flex-wrap">
          {" "}
          <div className="price flex flex-col">
            {" "}
            <p className="text-xl font-bold text-gray-600">Price:</p>
            <input
              className=" px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="quanity flex flex-col">
            {" "}
            <p className="text-xl font-bold text-gray-600">quanity:</p>
            <input
              className=" px-2 py-1 border-2 border-gray-400 focus:ring-2 focus:outline-none rounded-md ring-indigo-300 "
              type="number"
              placeholder="quanity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="text-xl font-bold text-gray-600">Sizes:</p>
          <div className=" flex gap-4 sm:flex-nowrap flex-wrap">
            <p
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
              className={` ${
                sizes.some((item) => item === "S")
                  ? " scale-110  -translate-y-2 bg-pink-300"
                  : "bg-slate-900"
              } text-white hover:bg-pink-300 px-3 py-1 rounded-lg cursor-pointer hover:text-slate-950  hover:-translate-y-2 ease-in-out duration-100`}
            >
              S
            </p>
            <p
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
              className={`bg-slate-900 text-white hover:bg-pink-300 px-3 py-1 rounded-lg cursor-pointer hover:text-slate-950 ${
                sizes.some((item) => item === "L")
                  ? " scale-110  -translate-y-2 bg-pink-300"
                  : ""
              } hover:-translate-y-2 ease-in-out duration-100`}
            >
              L
            </p>
            <p
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
              className={`bg-slate-900 text-white hover:bg-pink-300 px-3 py-1 rounded-lg cursor-pointer hover:text-slate-950 ${
                sizes.some((item) => item === "M")
                  ? " scale-110  -translate-y-2 bg-pink-300"
                  : ""
              } hover:-translate-y-2 ease-in-out duration-100`}
            >
              M
            </p>
            <p
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
              className={`bg-slate-900 text-white hover:bg-pink-300 px-3 py-1 rounded-lg cursor-pointer hover:text-slate-950 ${
                sizes.some((item) => item === "XL")
                  ? " scale-110  -translate-y-2 bg-pink-300"
                  : ""
              } hover:-translate-y-2  ease-in-out duration-100`}
            >
              XL
            </p>
            <p
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
              className={`bg-slate-900 text-white hover:bg-pink-300 px-3 py-1 rounded-lg cursor-pointer hover:text-slate-950 ${
                sizes.some((item) => item === "XXL")
                  ? " scale-110  -translate-y-2 bg-pink-300"
                  : ""
              } hover:-translate-y-2 ease-in-out duration-100`}
            >
              XXl
            </p>
          </div>
        </div>
        <div className="w-full flex gap-2 items-center border-4 border-pink-200 rounded-lg px-4 ">
          <input
            className="peer relative cursor-pointer appearance-none shrink-0 w-8 h-8 mt-1"
            type="checkbox"
            id="bestseller"
            onClick={() => setBestseller(!bestseller)}
          />
          <svg
            className="absolute w-8 h-8 pointer-events-none stroke-pink-500 fill-none peer-checked:!fill-pink-500 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <label htmlFor="bestseller" className="font-bold">
            bestseller
          </label>
        </div>
        <div className="add_button_submit flex justify-center">
          <button
            type="submit"
            className="px-3 py-2 w-full rounded-full  hover:-translate-y-1 active:translate-y-0 ease-in-out duration-150 hover:bg-slate-950 bg-slate-800 text-white"
          >
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFood;
