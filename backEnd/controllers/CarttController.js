import userModel from "../models/UserModel.js";

// function add to cart db
const addToCartDB = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    //user data
    const userData = await userModel.findById(userId);
    const cartItems = await userData.cartItems;

    if (!size) {
      return res.json({
        message: "not added to carte plz select size",
        data: cartItems,
      });
    } else {
      const item = cartItems.find(
        (item) => item.productId === productId && item.size === size
      );
      if (item) {
        item.quantity += Number(quantity);
        res.status(200).json({ message: "cart updated", data: cartItems });
      } else {
        cartItems.push({ productId, size, quantity });
        res
          .status(200)
          .json({ message: "Item added to cart", data: cartItems });
      }
    }
    await userModel.findByIdAndUpdate(userId, { cartItems: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateCartDB = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    //user data
    const userData = await userModel.findById(userId);
    const cartItems = await userData.cartItems;
    const item = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );
    if (item) {
      item.quantity += Number(quantity);
    } else {
      cartItems.push({ productId, size, quantity });
    }
    await userModel.findByIdAndUpdate(userId, { cartItems: cartItems });
    res.status(200).json({ message: "cart updated", data: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getUserCartDataDB = async (req, res) => {
  const { userId } = req.body;
  const userData = await userModel.findById(userId);
  const cartItems = await userData.cartItems;
  res.status(200).json({ cartItems });
};
// remove cart items

const removeCartItemsDB = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const userData = await userModel.findById(userId);
    const cartItems = userData.cartItems.filter(
      (item) => item.productId !== productId || item.size !== size
    );
    await userModel.findByIdAndUpdate(userId, { cartItems: cartItems });
    res.status(200).json({ message: "item deleted", data: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { addToCartDB, updateCartDB, getUserCartDataDB, removeCartItemsDB };
