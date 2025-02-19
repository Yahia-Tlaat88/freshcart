import React from 'react'
import { Link } from 'react-router-dom'
import { Fotter } from './Fotter'

export default function WishlistCart() {
    return (
        <>
        <h1 className='text-4xl text-center text-green-500 pb-4'>Wishlist</h1>
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
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4">
                                <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Apple Watch
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $599
                            </td>
                            <td className="px-6 py-4">
                                <Link to="#" className="text-slate-100 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><i className="fa-solid fa-trash"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                                    <Fotter></Fotter>
            </div>

        </>
    )
}
