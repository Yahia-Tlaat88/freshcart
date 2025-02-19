import React, { useEffect, useState } from 'react'
import ProductCards from './Commponents/ProductCards'
import axios from 'axios';
import MainSlider from './Commponents/MainSlider';
import CategoriesSlider from './Commponents/CategoriesSlider';

export default function Home() {

const [allProductData, setAllProductData] = useState([]); 

const getAllProducts = async(values) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        values
      );
      setAllProductData(data.data);
      console.log("🚀 ~ getAllProducts ~ data:", data)
    } catch (error){
      throw error;
    }

  }

useEffect(() => { getAllProducts(); }, []);
  return (
    <div className='mx-auto overflow-hidden'>
      <MainSlider></MainSlider>
      <CategoriesSlider></CategoriesSlider>
      <div className='flex flex-wrap '>
{allProductData?.map((ProductData) => <ProductCards key={ProductData._id} ProductData={ProductData} />)}
    </div>

      </div>
  )
}
