"use client"



interface Props {
    image: string
    name?: string
}

export default function ImageTwo({
    image,
    name = 'Image'
}: Props) {
    return (
        <>
            <img
                src={image}
                className={`w-full h-full object-fill
                    group-hover:scale-110 transition-transform 
                    duration-300 ease-in-out`}
                alt={name} />
        </>
    )
}
