import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({
  data: { attributes: p, id },
  onRemoveFavorite,
  isFavorite,
}) => {
  const dispatch = useDispatch();

  const addProductToCart = (e) => {
    e.stopPropagation();
    const product = {
      id,
      attributes: {
        name: p.name,
        price: p.price,
        slug: p.slug,
        thumbnail: p.thumbnail,
        size: p.size,
      },
      quantity: 1,
    };
    dispatch(addToCart(product));
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });  };


  return (

    <div className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">

      <Link
        href={`/product/${p.slug}`}
        className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      >
        <Image
          width={500}
          height={500}
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">{p.name}</h2>
          <div className="flex items-center text-black/[0.5]">
            <p className="mr-2 text-lg font-semibold">&#36;{p.price}</p>

            {p.original_price && (
              <>
                <p className="text-base  font-medium line-through">
                  &#36;;{p.original_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(p.original_price, p.price)}% off
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
      <div className="flex justify-end space-x-3">
        {isFavorite && (
          <button
            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFavorite(id);
            }}
          >
            Remove
          </button>
        )}
        {isFavorite && (
          <button
            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={addProductToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
