import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setcartempty } from "../Store/States";
function Verify() {
  const { token, baseurl } = useSelector((store) => store.states);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyOrder = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/api/order/stripeVerify`,
        { success, orderId },
        { headers: { token } }
      );
      dispatch(setcartempty());
      navigate(`/orders`);
      toast.success(response.data.message);
    } catch (error) {
      navigate("/cart");
      console.error(error);
    }

    // navigate to success page
  };
  useEffect(() => {
    verifyOrder();
  }, [token]);
  return <div>Verify</div>;
}

export default Verify;
