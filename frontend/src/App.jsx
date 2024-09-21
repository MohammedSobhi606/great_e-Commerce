import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import { Zoom } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "./Store/States";
import axios from "axios";
import Verify from "./pages/Verify";
function App() {
  const { baseurl, products } = useSelector((state) => state.states);
  const dispatch = useDispatch();
  const GetData = useMemo(
    () => async () => {
      try {
        const response = await axios.get(`${baseurl}/api/product/list`);
        if (response.status === 200) {
          dispatch(setProducts(response.data));
        } else {
          toast.error("Failed to fetch products. Please try again later.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [baseurl, products]
  );
  // fetch food list from API

  useEffect(() => {
    GetData();
  }, []);
  // get products from database

  return (
    <div className="px-4 sm:px-[7vw] md:px-[7vw] lg:px-[9vw]">
      <Router>
        <Navbar />
        <ToastContainer
          position="top-center"
          theme="light"
          draggable
          autoClose={500}
          transition={Zoom}
          pauseOnHover={false}
        />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place_order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
