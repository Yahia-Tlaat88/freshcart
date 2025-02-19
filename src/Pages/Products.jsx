import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCards from './Commponents/ProductCards';
import SearchInput from './Commponents/SearchInput';

export default function Products() {
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
    <div className='container mx-auto'>
      <h1 className='text-4xl text-center text-green-500 pb-3'>Products</h1>
      <div className='py-4'>
      <SearchInput></SearchInput>
      </div>
    <div className='flex flex-wrap '>
{allProductData?.map((ProductData) => <ProductCards key={ProductData._id} ProductData={ProductData} />)}
    </div>
    </div>
  )
}
