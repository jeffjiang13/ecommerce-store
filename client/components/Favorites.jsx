import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = ({ displayCount }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    setIsLoading(true); // Start loading
    try {
      const { data } = await fetchDataFromApi("/api/favorites?populate=*");

      // Filter favorites based on the current user's username
      const filteredFavorites = data.filter(
        (favorite) => favorite.attributes.userName === currentUser.username
      );

      setFavorites(filteredFavorites);

      const productIds = filteredFavorites.map((favorite) =>
        Number(favorite.attributes.item)
      );
      fetchProducts(productIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
    setIsLoading(false); // End loading
  };


  const fetchProducts = async (ids) => {
    setIsLoading(true); // Start loading
    try {
      const { data } = await fetchDataFromApi(`/api/products?populate=*`);
      const filteredProducts = data.filter((product) =>
        ids.includes(product.id)
      );
      setProducts({ data: filteredProducts });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false); // End loading
  };


  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // remove the product from local state as well
      setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
      window.location.reload();

      // Show a success toast
      toast.success("Product removed from favorites!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      // Show an error toast
      toast.error("Failed to remove product from favorites", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  console.log('favorite attributes item', favorites.map(favorite => favorite.attributes.item));

   // Other code...
   console.log("favorites", favorites);
   console.log("products", products);
   return (
    <div>
    <ToastContainer />
    {isLoading ? (
      <div>Loading...</div> // Display a loading indicator
    ) : favorites.length === 0 ? (
      <div className="text-center py-8">
        <h2 className="text-lg">Items added to your Favorites will be saved here.</h2>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.data?.slice(0, displayCount).map((product) => {
          const favorite = favorites.slice(0, displayCount).find(
            (favorite) => Number(favorite.attributes.item) === product.id
          );
          const favoriteId = favorite?.id;
          return (
            <ProductCard
              key={product.id}
              data={product}
              onRemoveFavorite={() => favoriteId && removeFavorite(favoriteId)}
              isFavorite={true}
            />
          );
        })}
      </div>
    )}
  </div>
);
};

Favorites.defaultProps = {
displayCount: Infinity,
};

export default Favorites;
