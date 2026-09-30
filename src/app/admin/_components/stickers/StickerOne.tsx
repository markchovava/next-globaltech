"use client"
import { valueWithFallback } from '@/_utils/StringManipulation'


interface Props {
    name: string,
    condition: string
}

export default function StickerOne({ name, condition }: Props) {
    return (
        <p className={`text-white px-2 py-1 rounded-lg ${name == condition ? 'bg-green-700' : 'bg-red-700'}`}>
            {name ? valueWithFallback(name) : 'Not Added yet'}
        </p>

    )
}
