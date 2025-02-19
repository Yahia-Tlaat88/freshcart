import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { CartContext } from './context/CartContext';
import { Link } from 'react-router-dom';
import { Fotter } from './Commponents/Fotter';
import { Button } from 'flowbite-react';
export function Cart() {
  const { getLoggedUserCart, updateCart, deleteProduct} = useContext(CartContext);
  const [cart, setCart] = useState();
  async function getCartItem() {
    const response = await getLoggedUserCart();
    if (response?.data?.status === 'success') {
      setCart(response.data.data);
    }
  }
  async function updateProduct(id, count) {
    const response = await updateCart(id, count)
    if (response.data.status == 'success') {
      setCart(response.data.data)
      toast.success('product updated')
    }
    else {
      toast.error('product failed to update')
    }
  }
  async function deleteItem(productId) {
    let response = await deleteProduct(productId)
    if (response?.data?.status === 'success') {
      setCart(response.data.data);
      setnumberItems(numberItems - 1);
    }
  }
  useEffect(() => {
    getCartItem()
  }, [])
  return (
    <>
      <h1 className='text-4xl text-center text-green-500 pb-4'>Cart</h1>
      {cart?.products.length > 0 ? <>
        <h2 className='text-2xl text-emerald-700 font-bold capitalize my-4' >  total price: {cart?.totalCartPrice}</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((product) =>
                <tr key={product.product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>
                          {product.count}
                        </span>
                      </div>
                      <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.price * product.count}
                  </td>
                  <td className="px-6 py-4">
                    <span onClick={() => deleteItem(product.product.id)} className=" cursor-pointer text-slate-100 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"><i className="fa-solid fa-trash"></i></span>
                  </td>
                </tr>)}

            </tbody>
          </table>
        </div>
            <Link to={"/Checkout"} >

            <Button className='mt-4 py-2 w-3/4 mx-auto ' color='success'>Cheeck Out</Button>
            </Link>
      </> : <h1 className='text-3xl text-red-700 font-bold text-center'>No items to show</h1>}
                    <Fotter/>


    </>
  )
}
