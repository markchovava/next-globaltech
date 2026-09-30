"use client"

import { MontserratMedium } from "@/_assets/fonts/montserrat/_MontserratFont"
import Link from "next/link"
import { motion } from "motion/react"


interface Props {
    name: string
    href?: string
}

export default function ServiceItem({ name, href = '#' }: Props) {
    return (
        <>
            <Link href={href}>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-lg overflow-hidden bg-white drop-shadow hover:drop-shadow-xl 
                    p-6 transition__effect border-b-4 border-transparent hover:border-sky-600`}>
                    <p className={`${MontserratMedium.className}`}>{name}</p>
                </motion.div>
            </Link>
        </>
    )
}
