import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoriesCard from './Commponents/CategoriesCard';

export function Categories() {
  const [allCategoriesData, setAllCategoriesData] = useState([]); 

const getAllCategoriess = async(values) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`,
        values
      );
      setAllCategoriesData(data.data);
      console.log("🚀 ~ getAllCategoriess ~ data:", data)
    } catch (error){
      throw error;
    }

  }
  useEffect(() => { getAllCategoriess(); }, []);
  
  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl text-center text-green-500 pb-3'>All Categories</h1>
      <div className='flex flex-wrap '>
{allCategoriesData?.map((CategoriesData) => <CategoriesCard key={CategoriesData._id} CategoriesData={CategoriesData} />)}
      </div>
    </div>
  )
}
