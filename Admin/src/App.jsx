import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Bounce,
  Flip,
  Slide,
  ToastContainer,
  Zoom,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Sidbare from "./Components/Sidbare";
import AddFood from "./pages/AddFood";
import ListFood from "./pages/ListFood";
import Orders from "./pages/Orders";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/Login";
function App() {
  const { token, url } = useSelector((store) => store.states);
  if (!token) {
    return (
      <>
        <Login />
        <ToastContainer
          autoClose={500}
          transition={Flip}
          position="top-center"
        />
      </>
    );
  } else {
    return (
      <div>
        <div className="px-4 sm:px-[7vw] md:px-[7vw] lg:px-[9vw]">
          <Router>
            <Navbar />
            <hr />
            <ToastContainer
              autoClose={800}
              transition={Zoom}
              position="top-center"
            />
            <div className="content flex gap-8 ">
              <Sidbare />
              <Routes>
                <Route path="/add" element={<AddFood />} />
                <Route path="/list" element={<ListFood />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
