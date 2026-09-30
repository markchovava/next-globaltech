"use client"

import { motion } from "motion/react"
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
        <>
            <Link href={href}>
                <motion.li
                    whileHover={{ x: '0.5rem' }}
                    whileTap={{ x: '0.5rem' }}
                    className="hover:underline">
                    {name}
                </motion.li>
            </Link>
        </>
    )
}
