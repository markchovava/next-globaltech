"use client"

import { NoImageData } from "@/_data/sample/NoImage";
import Image from "next/image";
import Link from "next/link";



interface Props {
    image?: string;
    name: string;
    href: string;
}



export default function Card({
    image = NoImageData,
    name,
    href
}: Props) {

    return (
        <div className={`group space-y-4 cursor-pointer bg-white drop-shadow hover:drop-shadow-xl pb-4 rounded-xl overflow-hidden`}>
            <div className='w-full lg:h-60 h-50 bg-gray-400 overflow-hidden border-b border-gray-200'>
                <Image
                    height={564}
                    width={720}
                    src={image}
                    alt='Image'
                    className='w-full transition__effect h-full object-cover group-hover:scale-110' />
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
