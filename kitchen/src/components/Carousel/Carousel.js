import React, { useState, useEffect, useCallback } from 'react';
import { client } from '../../client';
import CarouselSlide from './CarouselSlide';

import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css'
// import 'swiper/css/navigation'

// SwiperCore.use([Navigation])

const Carousel = () => {
    const [isCarouselLoading, setIsCarouselLoading] = useState(false);
    const [carouselSlides, setCarouselSlides] = useState([]);

    const cleanUpCarouselSlides = useCallback((rawData) => {
        const cleanSlides = rawData.map((slide) => {
            const {sys, fields} = slide
            const {id} = sys
            const slideTitle = fields.title
            const slideDescription = fields.description
            const slideBg = fields.image.fields.file.url
            const updatedSlide = {id, slideTitle, slideDescription, slideBg}
            return updatedSlide
        })
        setCarouselSlides(cleanSlides)
    }, [])

    const getCarouselSlides = useCallback(async () => {
        setIsCarouselLoading(true)
        try {
            const response = await client.getEntries({ content_type: 'kitchenCarousel' })
            const responseData = response.items
            if (responseData) {
                cleanUpCarouselSlides(responseData)
            } else {
                setCarouselSlides([])
            }
            setIsCarouselLoading(false)
        } catch (error) {
            console.log(error)
            setIsCarouselLoading(false)
        }
    }, [cleanUpCarouselSlides])

    useEffect(() => {
        getCarouselSlides();
    }, [getCarouselSlides]);
    
    // If there are no slides to display then do not render the component
    if (!Array.isArray(carouselSlides) || !carouselSlides.length) {
        return null
    }
    
    return (
        <div>
            {carouselSlides.map((item) => {
                const { id, slideBg, slideTitle, slideDescription } = item;
    
                return (
                    <CarouselSlide
                        key={id}
                        slideTitle={slideTitle}
                        slideDescription={slideDescription}
                        slideBg={slideBg}
                    />
                );
            })}
        </div>
    );
    
    
    
};

export default Carousel;
