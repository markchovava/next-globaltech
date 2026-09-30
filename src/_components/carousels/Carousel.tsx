"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDotFill, GoDot } from "react-icons/go";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { NoImageData } from '@/_data/sample/NoImage';
import Heading2 from '../headings/Heading2';
import Heading3 from '../headings/Heading3';



interface SwiperRefType {
    swiper: SwiperType;
}


interface PropInterface {
    data?: any[]
}


export default function Carousel({ data }: PropInterface) {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const swiperRef = useRef<SwiperRefType | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const totalSlides: number = 6; // Dynamic slide count based on data
    const handleSlideChange = (swiper: SwiperType): void => {
        setActiveIndex(swiper.activeIndex);
    };
    // Handle direct pagination click with React components
    const handlePaginationClick = (index: number): void => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };
    useEffect(() => {
        // This code will only run on the client-side
        setWindowWidth(window.innerWidth);
        const handleResize = (): void => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);



    return (
        <div className=" w-full mx-auto">
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={12}
                slidesPerView={4}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                onSlideChange={handleSlideChange}
                navigation={false}
                pagination={false} // Disable default pagination
                className="mb-2"
            >
                {/* slides */}
                {data && data.map((i, key) => (
                    <SwiperSlide key={key} className='p-2'>
                        <Card
                            key={key}
                            name={i.title}
                            image={NoImageData}
                            href={`/news/${i.id}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom controls container */}
            <div className="hidden carousel-controls flex-col items-center gap-4">
                {/* Custom React-based pagination dots */}
                <div className="custom-pagination flex items-center justify-center gap-3 mb-4">
                    {Array.from({
                        length: Math.ceil(totalSlides / (windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1))
                    }).map((_, index: number) => (
                        <button
                            key={index}
                            onClick={() => handlePaginationClick(index * (windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1))}
                            className="pagination-dot focus:outline-none"
                            aria-label={`Go to slide group ${index + 1}`}
                        >
                            {index === Math.floor(activeIndex / (windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1)) ? (
                                <GoDotFill className="w-5 h-5 text-blue-500" />
                            ) : (
                                <GoDot className="w-5 h-5 text-gray-300" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="navigation-buttons flex items-center justify-end gap-4">
                <button
                    onClick={() => swiperRef.current?.swiper?.slidePrev()}
                    className="group cursor-pointer carousel-button-prev p-2 rounded-full drop-shadow-lg bg-white hover:bg-gray-50 focus:outline-none"
                >
                    <FaCircleChevronLeft className="w-6 h-6 text-blue-900 transition-all ease-linear duration-100 group-hover:scale-105" />
                </button>
                <button
                    onClick={() => swiperRef.current?.swiper?.slideNext()}
                    className="group cursor-pointer carousel-button-next p-2 rounded-full drop-shadow-lg bg-white hover:bg-gray-50 focus:outline-none"
                >
                    <FaCircleChevronRight className="w-6 h-6 text-blue-900 transition-all ease-linear duration-100 group-hover:scale-105" />
                </button>
            </div>
        </div>
    );
}


interface pInterface {
    image?: string;
    name?: string;
    href?: string;
}

function Card({
    image = NoImageData,
    name = 'Name / Title',
    href = '#'
}: pInterface) {
    return (
        <div className={`group space-y-4 cursor-pointer bg-white drop-shadow hover:drop-shadow-xl pb-4 rounded-xl overflow-hidden`}>
            <div className='w-full lg:h-60 h-50 bg-gray-400 overflow-hidden border-b border-gray-200'>
                <img src={image} alt='Image' className='w-full transition__effect h-full object-cover group-hover:scale-110' />
            </div>
            <div className='px-4'>
                <Link href={href}>
                    <h5 className='cursor-pointer text-xl transition__effect hover:text-sky-600 font-serif hover:underline'>
                        {name}
                    </h5>
                </Link>
            </div>
        </div>
    );
}