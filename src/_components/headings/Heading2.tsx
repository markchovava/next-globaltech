"use client"


interface Props {
    name: string
    color?: string
}

export default function Heading2({
    name,
    color = 'text-gray-800'
}: Props) {
    return (
        <p className={`text-2xl font-serif font-bold ${color}`}>
            {name}
        </p>
    )
}
