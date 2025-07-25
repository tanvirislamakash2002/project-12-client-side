import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../../assets/bannerImg/1.jpg';
import bannerImg2 from '../../assets/bannerImg/2.jpg';
import bannerImg3 from '../../assets/bannerImg/3.jpg';

const slides = [
  {
    image: bannerImg1,
    title: 'Reduce Food Waste, Feed More People',
    subtitle: 'Join our community in saving surplus food and helping those in need.',
    ctaText: 'Learn More',
    ctaLink: '/allDonations',
  },
  {
    image: bannerImg2,
    title: 'Connect Restaurants with Charities',
    subtitle: 'Making food donations seamless and impactful.',
    ctaText: 'Get Started',
    ctaLink: '/allDonations',
  },
  {
    image: bannerImg3,
    title: 'Together We Build a Healthier Community',
    subtitle: 'Your donation can make a real difference today.',
    ctaText: 'See Donations',
    ctaLink: '/allDonations',
  },
];

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={6000}
      transitionTime={1000}
      swipeable
      emulateTouch
      dynamicHeight={false}
      useKeyboardArrows
      stopOnHover
      showIndicators={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute top-1/2 left-5 -translate-y-1/2 z-20 p-2 bg-black bg-opacity-30 rounded-full text-white hover:bg-opacity-60 transition"
          >
            &#10094;
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute top-1/2 right-5 -translate-y-1/2 z-20 p-2 bg-black bg-opacity-30 rounded-full text-white hover:bg-opacity-60 transition"
          >
            &#10095;
          </button>
        )
      }
    >
      {slides.map(({ image, title, subtitle, ctaText, ctaLink }, idx) => (
        <div
          key={idx}
          className="relative h-[70vh] w-full"
        >
          {/* Image */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl drop-shadow-lg">
              {title}
            </h2>
            <p className="text-gray-200 text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
              {subtitle}
            </p>
            <a
              href={ctaLink}
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
            >
              {ctaText}
            </a>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
