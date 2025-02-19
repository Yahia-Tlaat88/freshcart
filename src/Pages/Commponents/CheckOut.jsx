import React, { useState } from 'react'
import { Fotter } from './Fotter'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';

export default function CheckOut() {
    const { cartId } = React.useContext(CartContext);

    const [shippingAddress, setShippingAddress] = useState({
        details: "",
        phone: "",
        city: "",
    });

    const token = localStorage.getItem("userToken");
    console.log("🚀 ~ CheckOut ~ token:", token)

    const handleCreateOrder = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,
                { shippingAddress },
                { headers: { token } }
            );

            toast.success("Order created successfully!");
            setShippingAddress({ details: "", phone: "", city: "" });
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Failed to create order");
        }
    };
    return (
        <>
            <Toaster position='top-center'></Toaster>
            <form onSubmit={handleCreateOrder} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                    <input name='name' value={shippingAddress.details} onChange={(e) => setShippingAddress({ ...shippingAddress, details: e.target.value })} type="text" id="Name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " placeholder="Yaya" />
                </div>
                <div className="mb-5">
                    <label htmlFor="Phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone</label>
                    <input name='phone' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} type="tel" id="Phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " />
                </div>
                <div className="mb-5">
                    <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                    <input name='city' value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} type="text" id="City" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Check Out</button>
                <Fotter></Fotter>

            </form>
        </>

    )
}
