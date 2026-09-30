"use client"

import { NoImageData } from "@/_data/sample/NoImage"
import Image from "next/image"


interface Props {
    image: string
    text?: string
}

export default function ImagePrimary({
    image = NoImageData,
    text = 'Image'
}: Props) {
    return (
        <>
            <Image
                alt={text}
                src={image}
                fill
                className="object-cover"
            />
        </>
    )
}
