"use client"

import { NoImageData } from "@/_data/sample/NoImage"
import Image from "next/image"


interface Props {
    image?: string
    string?: string
}

export default function GalleryImage({
    image = NoImageData,
    string = "The text"
}: Props) {
    return (
        <>
            <div className='relative group cursor-pointer bg-white h-80 w-80 drop-shadow-md overflow-hidden rounded-2xl hover:drop-shadow-xl'>
                <div className="w-full h-full z-10 absolute top-0 left-0">
                    <Image
                        src={image}
                        alt='Image'
                        height={200}
                        width={200}
                        className="w-full h-full object-cover ease-in-out transition-all group-hover:scale-110" />
                </div>
                <div className="absolute z-20 bottom-0 left-0 p-4">
                    {string}
                </div>
            </div>
        </>
    )
}
