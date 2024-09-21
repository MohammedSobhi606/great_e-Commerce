import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { _id, name, image, price } = product;

  return (
    <>
      <Link
        to={`/product/${_id}`}
        className="text-gray-700 cursor-pointer"
        onClick={() => {
          window.scroll({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="overflow-hidden">
          <img
            src={image && image[0]}
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
        <p className="text-sm pt-3 pb-1 line-clamp-1 ">{name}</p>
        <p className="text-gray-500 text-sm font-medium">${price}</p>
      </Link>
    </>
  );
}

export default ProductItem;
