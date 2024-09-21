import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../Store/States";
function Login() {
  const { token, baseurl } = useSelector((store) => store.states);

  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const onChangeHa = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({ ...data, [name]: value });
  };
  const formhandeler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseurl}/api/user/admin/login`,
        data
      );
      toast.success(response.data.msg);
      dispatch(setToken(response.data.token));

      //   response.data.token ? navigate("/add") : "";
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={formhandeler}
      className="w-[90%] sm:max-w-96 flex flex-col items-center m-auto mt-14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10  ">
        <p className="text-3xl "> Admin Login</p>
        <hr className="h-[1.5px] border-none w-8 bg-gray-800" />
      </div>
      {/* sign up form */}

      {
        <div className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border-2 p-2 w-full rounded  border-gray-300 outline-none focus:ring-1 ring-blue-500 "
            value={data.email}
            name="email"
            onChange={onChangeHa}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 p-2 w-full rounded  border-gray-300 outline-none focus:ring-1 ring-blue-500 "
            value={data.password}
            name="password"
            onChange={onChangeHa}
          />
          <button
            className="w-full py-3 text-white bg-black rounded-md 
          "
            type="submit"
          >
            Login
          </button>
        </div>
      }
    </form>
  );
}

export default Login;
