import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchDataFromApi } from "@/utils/api";

const Favorites = ({ p }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    try {
      const { data } = await fetchDataFromApi("/api/favorites?populate=*");
      setFavorites(data);

      const productIds = data.map(favorite => Number(favorite.attributes.item));
      fetchProducts(productIds);
      console.log(productIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };


  const fetchProducts = async (ids) => {
    try {
      const { data } = await fetchDataFromApi(`/api/products?populate=*`);
      setProducts({data:data});
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log("products", products);
  console.log("p", p);

  console.log("favorites", favorites);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products?.data?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
