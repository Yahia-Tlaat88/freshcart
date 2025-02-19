import React, { useContext, useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { WishlistContext } from './context/WishlistContext';
import { CartContext } from './context/CartContext';
import { Fotter } from './Commponents/Fotter';

export default function Wishlist() {
  const { getWishlist, deleteWishlist } = useContext(WishlistContext);
  const [Wish, setWish] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getWishlistItem() {
    try {
      const response = await getWishlist();
      if (response.data.status === 'success') {
        setWish(response.data.data);
      }
    } catch (error) {
      throw error;
    }
    console.error("Error fetching wishlist:", error);
  }

  async function deleteWish(productId) {
    if (!productId) {
      console.error(" Error: Missing product ID");
      return;
    }

    console.log("Deleting product ID:", productId);

    try {
      const response = await deleteWishlist(productId);
      console.log("Delete API response:", response);

      if (response?.data?.status === 'success') {
        setWish((prevWish) => prevWish.filter(item => item.id !== productId));
        toast.success("Product removed successfully");
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      toast.error("Failed to remove product");
    }
  }


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

  useEffect(() => {
    getWishlistItem();
  }, []);

  return (
    <>
    <Toaster position="top-center"></Toaster>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Wish.length > 0 ? (
              Wish.map((product) => (
                <tr key={product._id || product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{product.title}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                    <span onClick={() => deleteWish(product._id || product.id)} className="cursor-pointer font-medium text-slate-100 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center">
                    <i className="fa-solid fa-trash"></i>
                    </span>

                    <span onClick={() => addToCart(product._id || product.id)} className="cursor-pointer font-medium text-slate-100 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 text-center">
                    <i class="fa-solid fa-cart-plus"></i>
                    </span>
                    </div>

                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Your wishlist is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Fotter></Fotter>
    </>
  );
}
