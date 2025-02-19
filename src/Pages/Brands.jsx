import React, { useEffect, useState } from 'react'
import BrandsCard from './Commponents/BrandsCard'
import axios from 'axios';

export default function Brands() {
  const [allBrandsData, setAllBrandsData] = useState([]); 

const getAllBrandss = async(values) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/Brands`,
        values
      );
      setAllBrandsData(data.data);
      console.log("🚀 ~ getAllBrandss ~ data:", data)
    } catch (error){
      throw error;
    }

  }
  useEffect(() => { getAllBrandss(); }, []);
  return (
    <div className='container mx-auto'>
        <h1 className='text-4xl text-center text-green-500 pb-3'>All Brands</h1>
      <div className='flex flex-wrap '>
{allBrandsData?.map((BrandsData) => <BrandsCard key={BrandsData._id} BrandsData={BrandsData} />)}
      </div>
    </div>
  )
}
