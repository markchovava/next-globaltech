"use client"


interface Props {
    name: string
}

export default function Heading1({
    name,
}: Props) {
    return (
        <h1 className="font-serif text-5xl leading-12">
            {name}
        </h1>
    )
}
