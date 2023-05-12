import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "@/utils/api";
const Favorites = () => {
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

        const productIds = data.map(favorite => favorite.attributes.item);
        fetchProducts(productIds);

      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchProducts = async (ids) => {
      try {
        const fetchedProducts = await Promise.all(ids.map(id => fetchDataFromApi(`/api/products/${id}`)));
        setProducts(fetchedProducts.map(response => response.data));

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const filteredFavorites = favorites?.filter(favorite => favorite.attributes.userName === currentUser.username);

    console.log("favorites", filteredFavorites);
    console.log("products", products);

    return (
      <div>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index}>
                <img src={product.attributes.image} alt={product.attributes.name} />

              <h2>{product.attributes.name}</h2>
              <p>${product.attributes.price}</p>
              {/* Display other product data as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Favorites;
