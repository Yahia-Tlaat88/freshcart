import React from 'react'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import slider4 from '../../assets/images/grocery-banner.png'
import slider5 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from "react-slick";
export default function MainSlider() {
    let Slider_Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };


    

    return <>
        <div className="flex my-5">
            <div className="w-3/4">
                <Slider {...Slider_Settings}>
                    <img src={slider3} className='w-full h-[400px] object-cover' alt='' />
                    <img src={slider4} className='w-full h-[400px] object-cover' alt='' />
                    <img src={slider5} className='w-full h-[400px] object-cover' alt='' />
                </Slider>
            </div>
            <div className='w-1/4'>
                <img src={slider1} className='w-full h-[200px]' alt='' />
                <img src={slider2} className='w-full h-[200px]' alt='' />
            </div>
        </div>

    </>
}
