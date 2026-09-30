"use client"
import { baseURL } from '@/_api/baseURL'
import { NoImageData } from '@/_data/sample/NoImage'
import Image from 'next/image'


interface PropInterface {
    label: string
    value?: string
}

export default function RecordImage({
    label,
    value
}: PropInterface) {



    // 2. Only construct the full URL if value exists, otherwise use your fallback
    const imgURL = value ? value : NoImageData;

    return (
        <>
            <div className='text-lg flex lg:flex-row flex-col items-start justify-start lg:gap-3 gap-1'>
                <div className='lg:w-[20%] leading-tight w-full font-light'>{label}:</div>
                <div className='lg:w-[80%] leading-tight w-full'>
                    <div className='lg:w-[25%] w-[50%] aspect-4/3 rounded-xl overflow-hidden bg-gray-50 drop-shadow-lg relative'>
                        {/* <Image 
                  alt={`Image`} 
                  src={imgURL} 
                  fill // Use fill for better control in aspect-ratio containers
                  className="object-cover hover:scale-105 transition-all duration-200 ease-in-out" 
                  sizes="(max-width: 768px) 50vw, 30vw"
                  priority={false}
              />  */}
                        <img
                            alt={`Image`}
                            src={imgURL}
                            className="object-cover object-center hover:scale-105 transition-all duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
