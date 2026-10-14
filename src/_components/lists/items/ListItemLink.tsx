"use client"

import Link from "next/link"

interface Props {
    href?: string
    name: string
}

export default function ListItemLink({
    name,
    href = '#'
}: Props) {
    return (
        <Link href={href} className="inline-block hover:underline">
            {name}
        </Link>
    )
}