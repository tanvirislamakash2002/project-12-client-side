import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/bannerImg/1.jpeg'
import bannerImg2 from '../../assets/bannerImg/2.jpeg'
import bannerImg3 from '../../assets/bannerImg/3.jpeg'
import bannerImg4 from '../../assets/bannerImg/4.jpeg'

const Banner = () => {
    return (
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        >
            <div className='h-[70vh] w-full bg-cover bg-center'
                style={{ backgroundImage: `url(${bannerImg1})` }}>
            </div>
            <div className='h-[70vh] w-full bg-cover bg-center'
                style={{ backgroundImage: `url(${bannerImg2})` }}>
            </div>
            <div className='h-[70vh] w-full bg-cover bg-center'
                style={{ backgroundImage: `url(${bannerImg3})` }}>
            </div>

        </Carousel>
    );
};

export default Banner;