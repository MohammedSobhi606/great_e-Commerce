import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  showbar: false,
  searchvalue: "",
  cartItems: [],
  baseurl: "http://localhost:5000",
  cartCount: 0,
  wishlistCount: 0,
  totalPrice: 0,
  token: "",
  products: [],
  isLoading: false,
};

const States = createSlice({
  name: "states",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    setShowbar(state) {
      state.showbar = !state.showbar;
    },
    setSearchValue(state, action) {
      state.searchvalue = action.payload;
    },
    addToCart(state, action) {
      state.cartItems = action.payload;
      state.cartCount = state.cartItems.length;
    },
    removeFromCart(state, action) {
      state.cartItems = action.payload;
      state.cartCount = state.cartItems.length;
    },
    updateQuantity(state, action) {
      state.cartItems = action.payload;
      state.cartCount = state.cartItems.length;
    },
    calTotalPrice(state, action) {
      state.totalPrice = state.cartItems.reduce((total, item) => {
        const product = action.payload.find((p) => p._id === item.productId);

        return total + product.price * item.quantity;
      }, 0);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setcartempty(state, action) {
      state.cartItems = [];
      state.cartCount = 0;
    },
  },
});

export const {
  setShowbar,
  setSearchValue,
  addToCart,
  removeFromCart,
  updateQuantity,
  calTotalPrice,
  setToken,
  setProducts,
  setCartCount,
  setIsLoading,
  setcartempty,
} = States.actions;
export default States.reducer;
