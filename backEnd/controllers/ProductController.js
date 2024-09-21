// add product functionality
import ProductModel from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
const addProduct = async (req, res) => {
  const {
    name,
    price,
    description,

    category,
    sub_category,
    sizes,
    bestseller,
    quantity,
  } = req.body;
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];
  console.log(image1, image2, image3, image4);
  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );
  let imagesUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  try {
    // validate inputs
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !sub_category ||
      !sizes ||
      !bestseller ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // create new product
    const newProduct = new ProductModel({
      name,
      price: Number(price),
      description,
      category,
      sub_category,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      quantity,
      image: imagesUrl,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ msg: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// list products
const listProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};
// remove products

const removeProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product removed successfully", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// single product info

const getsingleProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.Id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export { addProduct, getsingleProductById, removeProduct, listProducts };
