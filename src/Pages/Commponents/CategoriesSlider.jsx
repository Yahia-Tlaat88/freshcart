import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";
export default function CategoriesSlider() {
    const [categories, setcategories] = useState([])
    let Slider_Settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 500,
    };

    async function getcategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            setcategories(data.data)
        }
        catch (error) {
            throw error
        }
    }
    useEffect(() => {
        getcategories();
    }, [])
    return <>
        <h2 className='my-5 capitalize font-semibold text-green-600 text-center'> Shop popular categories</h2>
        <div className='my-5'>

        <Slider {...Slider_Settings}>
            {categories.map((category) => <div key={category._id}>
                <img src={category.image} className='w-full h-[180px] object-cover ' alt='' />
                <h6>{category.name}</h6>
            </div>)}
        </Slider>
        </div>
    </>
}
