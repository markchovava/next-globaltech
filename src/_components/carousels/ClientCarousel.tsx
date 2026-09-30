"use client"
import { useEffect, useRef, useState } from 'react';
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
import { EventInterface } from '@/_data/entity/EventEntity';
import { formatDate, parseDateInfo } from '@/_utils/formatDate';
import { MontserratExtraBold } from '@/_assets/fonts/montserrat/_MontserratFont';
import Image from 'next/image';
import { ClientInterface } from '@/_data/entity/ClientEntity';



interface SwiperRefType {
    swiper: SwiperType;
}


interface PropInterface {
    data?: any[]
}


export default function ClientCarousel({ data }: PropInterface) {
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
                slidesPerView={6}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
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
                            data={i}
                        />
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
                                <GoDotFill className="w-5 h-5 text-amber-500" />
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
                    <FaCircleChevronLeft className="w-6 h-6 text-amber-900 transition-all ease-linear duration-100 group-hover:scale-105" />
                </button>
                <button
                    onClick={() => swiperRef.current?.swiper?.slideNext()}
                    className="group cursor-pointer carousel-button-next p-2 rounded-full drop-shadow-lg bg-white hover:bg-gray-50 focus:outline-none"
                >
                    <FaCircleChevronRight className="w-6 h-6 text-amber-900 transition-all ease-linear duration-100 group-hover:scale-105" />
                </button>
            </div>
        </div>
    );
}


interface pInterface {
    data: ClientInterface
    href?: string
}

function Card({ data }: pInterface) {
    return (
        <div className={`group cursor-pointer bg-white drop-shadow hover:drop-shadow-xl  rounded-xl overflow-hidden`}>
            <Image alt={data.name}
                src={data.image}
                width={400}
                height={300}
                className='object-cover w-full h-full' />

        </div>
    );
}