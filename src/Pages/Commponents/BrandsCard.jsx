import React from 'react'
import { Link } from 'react-router-dom'

export default function BrandsCard({BrandsData}) {



    return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
    

<div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-green-500 hover:border-green-500 transition-all ">
    <Link to="#">
        <img class="rounded-t-lg" src={BrandsData?.image} alt={BrandsData?.slug} />
    </Link>
    <div class="p-5">
        <Link to="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{BrandsData?.name}</h5>
        </Link>
    </div>
</div>
    </div>
  )
}
