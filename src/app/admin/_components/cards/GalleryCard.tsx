"use client"

import IconDefault from "@/_components/icons/IconDefault"
import { NoImageData } from "@/_data/sample/NoImage"
import Image from "next/image"
import Link from "next/link"

interface Props {
    image?: string
    text?: string
    deleteBtn?: () => void
    viewBtn?: () => void
}

export default function GalleryCard({
    image = NoImageData,
    text = "The Image",
    deleteBtn = () => { },
    viewBtn = () => { },
}: Props) {
    return (
        <div className="group relative h-80 w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 drop-shadow-md hover:drop-shadow-xl">
            <Image
                unoptimized
                src={image}
                alt={text}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-all ease-in-out group-hover:scale-110"
            />

            {/* gradient so the caption stays readable */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-1/2 w-full bg-linear-to-t from-black/90 to-transparent" />

            <div className="absolute bottom-0 left-0 z-20 p-4 text-white">
                {text}
            </div>

            <div className="absolute right-0 top-0 z-30 flex items-center justify-end gap-3 p-4">
                <button
                    onClick={viewBtn}
                    aria-label="View image"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 transition-all duration-200 ease-in-out hover:scale-110"
                >
                    <IconDefault type="eye" css="text-lg text-white" />
                </button>
                <button
                    type="button"
                    onClick={deleteBtn}
                    aria-label="Delete image"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-600 transition-all duration-200 ease-in-out hover:scale-110"
                >
                    <IconDefault type="delete" css="text-lg text-white" />
                </button>
            </div>
        </div>
    )
}