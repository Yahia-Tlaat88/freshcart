import { Badge } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../context/WishlistContext";



export default function ProductCards({ProductData}) {
  const [loading, setLoading] = useState(false);

    const {addProductToCart} = useContext(CartContext);
    async function addToCart(id){
      setLoading(true);
       const response = await addProductToCart(id);
          if (response.data.status=="success"){
              toast.success(response.data.message);
              setLoading(false)
          }
          else{
              toast.error(response.data.message);
              setLoading(false)
          }
        
        }


        const {addProductoWishlist} = useContext(WishlistContext);
        async function addToWishlist(productId) {
          try {
            const response = await addProductoWishlist(productId);
            if (response.data.status === 'success') {
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error(error);
            toast.error('Failed to add to wishlist');
          }
        }
  return (
    <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <Toaster position="top-right" />
      <div className="  bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-green-500 hover:border-green-500 hover:scale-95 transition-all ">
        <div>
          <Link to={`/Products/${ProductData?._id}`}>
          <img
            className="w-full p-8 rounded-t-sm"
            src={ProductData?.imageCover}
            alt={ProductData?.title}
          /></Link>
        </div>
        <div className="px-3 pb-3">
          <Link to={`/Products/${ProductData?._id}`}>
            <h1 className="text-lg line-clamp-1 font-semibold tracking-tight text-gray-900">
              {ProductData?.title}
            </h1>
          </Link>
          <p className="px-1 text-gray-700 text-sm font-semibold line-clamp-2">
            {" "}
            {ProductData?.description}
          </p>
          <div className="flex items-center justify-between mt-2.5 mb-3">
            <Badge className="bg-green-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
              {ProductData?.ratingsAverage}
              <span className="">
                <i className="fa-solid fa-star"></i>
              </span>{" "}
            </Badge>

            <Link
              to={`/Products/${ProductData?._id}`}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center"
            onClick={() => addToWishlist(ProductData.id)}
            >
              <span>
                <i className="fa-regular fa-heart"></i>
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">{ProductData?.price}</span>
              <span className="ms-1 text-xl text-gray-900">EGP</span>
            </div>
            <Link
              to="#"
              className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => addToCart(ProductData.id)}
            >
              <button> Add to cart </button>
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}