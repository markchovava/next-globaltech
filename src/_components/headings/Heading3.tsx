"use client"


interface Props {
    name: string
    color?: string
}

export default function Heading3({
    name,
    color = 'text-gray-800'
}: Props) {
    return (
        <p className={`text-xl font-serif font-bold ${color}`}>
            {name}
        </p>
    )
}
