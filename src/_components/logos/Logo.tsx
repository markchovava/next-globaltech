"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"

interface Props {
    /** Height classes for the logo. Set height only; width follows the image ratio. */
    iconCss?: string
    alt?: string
    onClick?: () => void
}

export default function Logo({
    iconCss = "h-16 lg:h-20",
    alt = "FL Designers",
    onClick
}: Props) {
    return (
        <Link
            href="/"
            onClick={onClick}
            aria-label={`${alt}, home`}
            className="inline-flex rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
            <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.85 }}
                className="flex items-center"
            >
                <Image
                    src="/assets/images/logos/logo2.png"
                    alt={alt}
                    width={400}
                    height={72}
                    priority
                    className={`${iconCss} w-auto object-contain transition-[height] duration-200`}
                />
            </motion.div>
        </Link>
    )
}