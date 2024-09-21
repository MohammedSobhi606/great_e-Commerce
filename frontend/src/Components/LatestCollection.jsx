import React from "react";

import Title from "./Title";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
function LatestCollection() {
  const { products } = useSelector((state) => state.states);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const latest = products.slice(0, 10); // slice method for getting specific products number of products not all
    setLatestProducts(latest);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-sm text-gray-600">
          Discover our latest additions to our collection.
        </p>
      </div>
      {/* latest products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
        {latestProducts.map((product, i) => (
          <ProductItem product={product} key={i} />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
