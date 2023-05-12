import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = ({ p }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    try {
      const { data } = await fetchDataFromApi("/api/favorites?populate=*");
      setFavorites(data);

      const productIds = data.map((favorite) =>
        Number(favorite.attributes.item)
      );
      fetchProducts(productIds);
      console.log("productIds", productIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchProducts = async (ids) => {
    try {
      const { data } = await fetchDataFromApi(`/api/products?populate=*`);
      const filteredProducts = data.filter((product) =>
        ids.includes(product.id)
      );
      console.log("filteredProducts", filteredProducts);

      setProducts({ data: filteredProducts });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
       {favorites.length === 0 ? (
         <div className="text-center py-8">
           <h2 className="text-lg">Items added to your Favorites will be saved here.</h2>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {products?.data?.map((product) => {
             console.log("favorites", favorites);
             console.log("product.id", product.id);
             const favorite = favorites.find(
               (favorite) => Number(favorite.attributes.item) === product.id
             );
             console.log("favorite for product", product.id, ":", favorite);
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

 export default Favorites;
