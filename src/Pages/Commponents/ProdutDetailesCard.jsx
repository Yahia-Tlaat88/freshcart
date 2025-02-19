import axios from 'axios';
import { Badge } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react';
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { CartContext } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProdutDetailesCard() {
  let ProductId = useParams();
  const [Product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  async function getProduct() {
    try {

      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProductId.id}`)
      setProduct(data.data)
      console.log("🚀 ~ getProduct ~ data:", data)
      
    }
    catch (error) {
      throw error
    }
  }

  useEffect(() => { getProduct()}, []);

  let Slider_Settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
  };
  console.log("🚀 ~ ProdutDetailesCard ~ ProductId:", ProductId)




  const {addProductToCart} = useContext(CartContext);
  async function addToCart(id){
    setLoading(true);
     let response = await addProductToCart(id);
        if (response.data.status=="success"){
            toast.success(response.data.message);
            setLoading(false)
        }
        else{
            toast.error(response.data.message);
            setLoading(false)
        }
      
      }

  return (
    <>
      <div className="flex items-start">
        <Toaster position="top-right" />
        <div className="w-full md:w-1/4 overflow-hidden">
        <Slider {...Slider_Settings}>
      {Product ?.images?.map((src)=><img src={src} className='w-full' alt={Product?.title} />)}
      
    </Slider>

        </div>

        <div className="md:w-3/4 p-4 flex-col items-center justify-center">
          <h3 className="font-semibold capitalize text-2xl">{Product?.title}</h3>
          <div className="flex justify-between p-3">
            <span className="font-bold text-lg">{Product?.price} EGP</span>
            <span className="flex items-center">
              <i className="fas fa-star text-yellow-400 mr-1"></i>{Product?.ratingsAverage}
            </span>
          </div>
          <h4 className="text-gray-700 my-4">{Product?.description}</h4>
          <div className="flex flex-col items-center justify-between">
          <h4>{Product?.category?.name}</h4>
          <Link
            to="#"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() =>  addToCart(Product.id)}
          >
            <button>Add to cart</button>
          </Link>
          </div>
        </div>
      </div>
    </>
  )
}
